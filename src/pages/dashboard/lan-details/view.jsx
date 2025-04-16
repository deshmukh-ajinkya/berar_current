import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { LanDetailsView } from 'src/sections/lan-details/view/lan-view';
// ----------------------------------------------------------------------

const metadata = { title: `Create a new Lan | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <LanDetailsView />
    </>
  );
}
