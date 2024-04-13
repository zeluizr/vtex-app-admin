import { useEffect, useState } from "react";
import {
  BarChart, Layout, PageBlock, PageHeader,
  Spinner, Table, Tag, Totalizer
} from "vtex.styleguide";
import { formatUrl } from "./components/formatUrl";

const TITLE = "Eshopper Score Rankings";
const SUBTITLE =
  "The Eshopper score is an all-in-one metric built from expert analysis of a site's usability and shopper friendliness.";

export default function EshopperApp() {
  const [loading, setLoading] = useState<boolean>(true);
  const [siteInfo, setSiteInfo] = useState<any>();
  const [estimatedMonthlyVisits, setEstimatedMonthlyVisits] = useState<any>([]);
  const [engagements, setEngagements] = useState<any>([]);
  const [woorank, setWoorank] = useState<any>([]);


  useEffect(() => {
    (async () => {
      const account = await fetch(
        "/_v/clienteaccount"
      ).then(res => res.json());

      const countimages = await fetch(
        "/_v/countimages"
      ).then(res => res.json());

      console.log(countimages);

      const { hosts } = account;
      const [host] = hosts;

      const result = await fetch(
        `/_v/cliente/${formatUrl(host)}`
      ).then(res => res.json());

      const { data } = result;
      const [cliente] = data || [];

      setSiteInfo(cliente)
      setLoading(false);

      const WOORANK = createWooRankHTML(cliente?.woorank?.criteria);
      WOORANK.sort((a, b) => (a.status > b.status ? 1 : -1));
      setWoorank(WOORANK);
      setEstimatedMonthlyVisits(createEstimatedMonthlyVisits(cliente?.similarweb?.estimated_monthly_visits))
      setEngagements([
        {
          email: new Intl.NumberFormat().format(cliente?.similarweb?.engagments?.visits).toString(),
          name: 'Visitas',
        },
        {
          email: FormatSecontNormalize(cliente?.similarweb?.engagments?.time_on_site).toString(),
          name: 'Tempo no site',
        },
        {
          email: (cliente?.similarweb?.engagments?.page_per_visit).toFixed(3),
          name: 'Visitas por página',
        },
        {
          email: `${(cliente?.similarweb?.engagments?.bounce_rate * 100).toFixed(2)} %`,
          name: 'Taxa de rebote',
        },
      ])

    })();
  }, []);

  return (
    <Layout pageHeader={<PageHeader title={TITLE} subtitle={SUBTITLE} />}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {siteInfo && (
            <div className="ph5 ph0-m ph0-l">
              <PageBlock variation="full">
                <div className="flex flex-column flex-row-l justify-between">
                  <div className="w-100 w-40-l mr6"><img src={siteInfo?.lighthouse?.screenshot} alt={siteInfo?.name} title={siteInfo?.name} /></div>
                  <div className="w-100 w-60-l flex-grow-1-l">
                    <h1 className="ma0 mb2">{siteInfo?.name}</h1>
                    <small>{siteInfo?.domain}</small>
                    <p className="">{siteInfo?.description}</p>
                  </div>
                </div>
              </PageBlock>
              <PageBlock variation="half">
                <div>
                  <h3 className="mt0 mb5">Performance</h3>
                  <Totalizer
                    items={[
                      {
                        label: 'Performance',
                        value: formatPerformance(siteInfo?.lighthouse?.performance),
                        isLoading: false,
                      },
                      {
                        label: 'Accesibilidade',
                        value: formatPerformance(siteInfo?.lighthouse?.accessibility),
                        isLoading: false,
                      },

                      {
                        label: 'SEO',
                        value: formatPerformance(siteInfo?.lighthouse?.seo),
                        isLoading: false,
                      },
                    ]}
                  />
                </div>
                <div>
                  <h3 className="mt0 mb5">Engagements</h3>
                  <Table
                    disableHeader={true}
                    schema={{
                      properties: {
                        name: {
                          type: 'string',
                          title: 'Name',
                        },
                        email: {
                          type: 'string',
                          title: 'Email',
                        },
                      },
                    }}
                    items={engagements}
                  />
                  <h3 className="mt5 mb5">Estimated monthly visits</h3>
                  <BarChart
                    data={estimatedMonthlyVisits}
                    xAxisKey='date'
                    yAxisKey='views'
                  />
                </div>
              </PageBlock>

              <div className="mt-10 space-y-5">
                <h3 className="text-2xl font-light">On-Page</h3>
                <div className="space-y-3">
                  {woorank &&
                    woorank.map((criteria: any, index: number) => {
                      return (
                        <>
                          {criteria?.advice && (
                            <PageBlock variation="full">
                              <div
                                key={index}
                              >
                                <div className="flex mb5 justify-between items-center">
                                  <h3 className="">
                                    {criteria?.name}
                                  </h3>
                                  <div>
                                    <Tag type={getStatus(criteria?.status)}>
                                      {criteria?.status}
                                    </Tag>
                                  </div>
                                </div>
                                <div
                                  className=""
                                  dangerouslySetInnerHTML={{
                                    __html: criteria?.advice,
                                  }}
                                />
                              </div>
                            </PageBlock>
                          )}
                        </>
                      );
                    })}
                </div>
              </div>

            </div>
          )}
        </>
      )}
    </Layout>
  );
}

function createWooRankHTML(woorank: any) {
  let WOORANK = [];
  for (let x in woorank) {
    WOORANK.push(woorank[x]);
  }
  return WOORANK;
}


function createEstimatedMonthlyVisits(emv: any) {
  let EMV = [];
  for (let x in emv) {
    EMV.push({
      date: x,
      views: emv[x],
    });
  }
  return EMV;
}

function formatPerformance(performance: any) {
  return `${Number(performance * 100)} / 100`
}

function FormatSecontNormalize(time: number) {
  const seconds = (time % 60).toFixed(0);
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600);

  function addZero(num: number) {
    return num < 10 ? "0" + num : num;
  }

  return `${addZero(hours)}:${addZero(minutes)}:${addZero(Number(seconds))}`;
}

function getStatus(status: string): any {
  if (status === "good") return "success"
  if (status === "bad") return "error"
  if (status === "average") return "warning"
  if (status === "neutral") return "neutral"
}