import React, { useRef, useEffect } from 'react';
import Markdown from 'markdown-to-jsx';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import { chakra,PropsOf} from '@chakra-ui/react';
import WebsiteLink from 'components/website-link';


type Props = PropsOf<typeof chakra.div> & {
  md: string
  fontSize?: string
}


export function MarkdownRender({ md,fontSize, ...rest }:Props) {
  const rootRef = useRef<HTMLDivElement>();

  useEffect(() => {
    rootRef.current.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }, [md]);

  return (
    <div ref={rootRef} style={{height:'100%'}}>
      <Markdown 
        children={md} 
        {...rest} 
        style={{height:'100%',fontSize: fontSize??'14px'}}
        options={{
          overrides: {
            WebsiteLink: {
              component: WebsiteLink,
            },
          },
        }}
        ></Markdown>
    </div>
  );
}