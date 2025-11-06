import fs from 'fs';
import matter from 'gray-matter';
import { marked } from 'marked';
import path from 'path';

import Layout from '@/components/common/Layout';

import BackButton from './_components/BackButton';
import TableOfContents, { TOCType } from './_components/TableOfContents';
import * as styles from './page.css';

type PageProps = {
  params: { id: string };
};

export default async function Page({ params }: PageProps) {
  const { id } = params;

  const filePath = path.join(process.cwd(), 'content/histories', `${id}.mdx`);
  const markdownWithMeta = fs.readFileSync(filePath, 'utf-8');
  const { content, data } = matter(markdownWithMeta);

  const toc: TOCType[] = [];

  const heading = ({ text, depth }) => {
    const headingIdRegex = /(?: +|^)\{#([a-z][\w-]*)}(?: +|$)/i;
    const hasId = text.match(headingIdRegex);

    const generateId = () =>
      `${depth}-${text
        .trim()
        .replace(/[^\w\s가-힣-]/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase()}`;

    const id = hasId ? hasId[1] : generateId();

    if (depth <= 3) toc.push({ id, text, depth });
    return `<h${depth} id="${id}" onclick="document.getElementById('${id}').scrollIntoView({ behavior: 'smooth' }); window.history.pushState(null, '', '#${id}');">${text.replace(headingIdRegex, '')}</h${depth}>\n`;
  };

  marked.use({ renderer: { heading } });

  const code = marked.parse(content);

  return (
    <Layout>
      <BackButton className={styles.backButton} />
      <div className={styles.container}>
        <article className={styles.article}>
          {data.archived === true && (
            <div className={styles.alert}>🕓 이 페이지는 이전 행사의 정보를 담고 있습니다.</div>
          )}
          <div dangerouslySetInnerHTML={{ __html: code }} />
        </article>
        <TableOfContents toc={toc} />
      </div>
    </Layout>
  );
}
