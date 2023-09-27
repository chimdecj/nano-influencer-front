import { useTranslations } from 'next-intl';

import FormComponent from '@/components/FormComponent';

export default function Page() {
  const t = useTranslations('site');

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <FormComponent />
    </section>
  );
}
