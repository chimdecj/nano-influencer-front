'use client';

import { useState } from 'react';
import React from 'react';

import { useServerInsertedHTML } from 'next/navigation';

import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';
import Entity from '@ant-design/cssinjs/lib/Cache';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

// suppress useLayoutEffect warnings when running outside a browser
if (!process.browser) React.useLayoutEffect = React.useEffect;

export function AntdProvider({ children }: { children: React.ReactNode }) {
  const cache = React.useMemo<Entity>(() => createCache(), [createCache]);
  useServerInsertedHTML(() => (
    <style
      id="antd"
      dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
    />
  ));
  return <StyleProvider cache={cache}>{children}</StyleProvider>;
}
