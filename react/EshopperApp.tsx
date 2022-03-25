import React, { useEffect, useState } from 'react';
import { Box, Layout, PageHeader, Progress, Tag, Totalizer } from 'vtex.styleguide';
import './styles.global.css';

const TITLE = "Eshopper Score Rankings";
const SUBTITLE = "The Eshopper score is an all-in-one metric built from expert analysis of a site's usability and shopper friendliness. It's built from 8 components: SEO, Navigation, Content & Customization, Web Performance, Purchase Policy, Cart & Checkout, Omnichannel y Customer Service";

type SiteInfoType = {
  title?: string,
  vertical?: string,
}

export default function EshopperApp() {
  const [loading, setLoading] = useState(true)
  const [siteInfo, setSiteInfo] = useState<SiteInfoType>()

  useEffect(() => {
    (async () => {
      const { Results } = await fetch("https://api.builtwith.com/v19/api.json?KEY=2a15b1b8-cc56-4637-8d0e-a230095acb79&LOOKUP=fravega.com").then(res => res.json())


      setSiteInfo({
        title: Results[0]?.Meta?.CompanyName,
        vertical: Results[0]?.Meta?.Vertical
      })

      setLoading(false);
    })()
  })

  return (
    <Layout pageHeader={<PageHeader title={TITLE} subtitle={SUBTITLE} />}>
      <Box>
        {loading ? <Progress type="steps" steps={['inProgress']} /> : (
          <div>
            <section className='justify-between flex items-center'>
              <h2>{siteInfo?.title}</h2>
              <Tag>
                Category: {siteInfo?.vertical}
              </Tag>
            </section>
            <section>
              <Totalizer
                items={[
                  {
                    inverted: true,
                    value: 'Total Orders',
                    label: 'Until 10h10',
                  },
                  {
                    label: 'Today',
                    value: 12364,
                  },
                  {
                    label: 'Yesterday',
                    value: 11980,
                  },

                  {
                    label: 'Last Week',
                    value: 10776,
                  },
                  {
                    label: 'Last Year',
                    value: 9802,
                  },
                ]}
              />
            </section>
          </div>
        )}

      </Box>
    </Layout>
  )
}
