import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion';
import { Marked, type Tokens } from 'marked';
import Image from 'next/image';

import Layout from '@/components/common/Layout';
import { faq } from '@/constants/faq';

import * as styles from './page.css';

const BARE_URL_REGEX = /^https?:\/\/[\w\-.~:/?#[\]@!$&'*+,;=%()]+/;

const countOf = (text: string, character: string) => text.split(character).length - 1;

const tokenizeBareUrl = (src: string): Tokens.Link | false => {
  const match = BARE_URL_REGEX.exec(src);
  if (!match) {
    return false;
  }

  let href = match[0].replace(/[.,;:!?]+$/, '');
  while (href.endsWith(')') && countOf(href, ')') > countOf(href, '(')) {
    href = href.slice(0, -1);
  }

  return {
    type: 'link',
    raw: href,
    href,
    title: null,
    text: href,
    tokens: [{ type: 'text', raw: href, text: href, escaped: false }],
  };
};

const markdown = new Marked({ breaks: true, tokenizer: { url: tokenizeBareUrl } });

const renderAnswer = (answer: string) => markdown.parse(answer, { async: false });

export default function Page() {
  return (
    <Layout>
      <Accordion className={styles.list} type="multiple">
        {faq.map(({ id, question, answer }) => (
          <AccordionItem className={styles.item} key={id} value={id}>
            <AccordionTrigger className={styles.trigger}>
              <Image
                src="/static/icons/ic_arrow_right_24dp.svg"
                alt="Chevron Icon"
                width={24}
                height={24}
                aria-hidden
              />
              {question}
            </AccordionTrigger>
            <AccordionContent className={styles.content}>
              <div
                className={styles.answer}
                dangerouslySetInnerHTML={{ __html: renderAnswer(answer) }}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Layout>
  );
}
