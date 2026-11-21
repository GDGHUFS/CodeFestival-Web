import fs from 'fs';
import matter from 'gray-matter';
import { Marked, Tokens } from 'marked';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import path from 'path';

import Layout from '@/components/common/Layout';
import { METADATA } from '@/constants/metadata';

import ArticleContent from './_components/ArticleContent';
import BackButton from './_components/BackButton';
import TableOfContents, { TOCType } from './_components/TableOfContents';
import * as styles from './page.css';
import { timestampExtension } from './timestamp';

const HISTORY_DIRECTORY = path.join(process.cwd(), 'content/histories');
const HISTORY_EXTENSION = '.mdx';
const HEADING_ID_REGEX = /(?: +|^)\{#([a-z][\w-]*)}(?: +|$)/i;

const getHistoryIds = () =>
  fs
    .readdirSync(HISTORY_DIRECTORY)
    .filter(fileName => fileName.endsWith(HISTORY_EXTENSION))
    .map(fileName => path.basename(fileName, HISTORY_EXTENSION));

export const dynamicParams = false;

export const generateStaticParams = () => getHistoryIds().map(id => ({ id }));

type HistoryFrontmatter = {
  title?: string;
  description?: string;
  image?: string;
  archived?: boolean;
};

const readHistory = (id: string) => {
  if (!getHistoryIds().includes(id)) {
    notFound();
  }

  const { content, data } = matter(
    fs.readFileSync(path.join(HISTORY_DIRECTORY, `${id}${HISTORY_EXTENSION}`), 'utf-8'),
  );
  return { content, data: data as HistoryFrontmatter };
};

export const generateMetadata = async ({
  params,
}: PageProps<'/festival/[id]'>): Promise<Metadata> => {
  const { id } = await params;
  const { data } = readHistory(id);
  const title = data.title ?? METADATA.title;
  const description = data.description ?? METADATA.description;
  const image = { url: data.image ?? METADATA.ogImage, alt: title };

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/festival/${id}`,
      type: 'website',
      images: [image],
      siteName: METADATA.siteName,
      locale: 'ko_KR',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      site: '@gdghufs',
    },
  };
};

const renderHistory = (content: string) => {
  const toc: TOCType[] = [];

  const heading = ({ text, depth }: Tokens.Heading) => {
    const customId = text.match(HEADING_ID_REGEX)?.[1];
    const id =
      customId ??
      `${depth}-${text
        .trim()
        .replace(/[^\w\s가-힣-]/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase()}`;

    if (depth <= 4) toc.push({ id, text, depth });
    return `<h${depth} id="${id}">${text.replace(HEADING_ID_REGEX, '')}</h${depth}>\n`;
  };

  const html = new Marked({
    renderer: { heading },
    extensions: [timestampExtension],
  }).parse(content, { async: false });

  return { html, toc };
};

export default async function Page({ params }: PageProps<'/festival/[id]'>) {
  const { id } = await params;
  const { content, data } = readHistory(id);
  const { html, toc } = renderHistory(content);

  return (
    <Layout>
      <BackButton className={styles.backButton} />
      <div className={styles.container}>
        <article className={styles.article}>
          {data.archived === true && (
            <div className={styles.alert}>🕓 이 페이지는 이전 행사의 정보를 담고 있습니다.</div>
          )}
          <ArticleContent html={html} />
        </article>
        <TableOfContents toc={toc} />
      </div>
    </Layout>
  );
}
