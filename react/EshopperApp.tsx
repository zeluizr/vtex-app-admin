import React, { useEffect, useState } from "react";
import {
  Layout,
  PageHeader,
  Progress
} from "vtex.styleguide";

const TITLE = "Eshopper Score Rankings";
const SUBTITLE =
  "The Eshopper score is an all-in-one metric built from expert analysis of a site's usability and shopper friendliness. It's built from 8 components: SEO, Navigation, Content & Customization, Web Performance, Purchase Policy, Cart & Checkout, Omnichannel y Customer Service";

const formatUrl = (host: string) => {
  return host.replace(
    /(https:\/\/www\.)|(https:\/\/)|(http:\/\/)|(http:\/\/www\.)|(www\.)/gi,
    ""
  );
}

export default function EshopperApp() {
  const [loading, setLoading] = useState<boolean>(true);
  const [siteInfo, setSiteInfo] = useState<any>();

  useEffect(() => {
    (async () => {
      const account = await fetch(
        "/_v/clienteaccount"
      ).then(res => res.json());
      const { hosts } = account;

      const [host] = hosts;



      const result = await fetch(
        `/_v/cliente/${formatUrl(host)}`
      ).then(res => res.json());


      const { data } = result;
      const [cliente] = data || [];

      setSiteInfo(cliente)
      setLoading(false);
    })();
  }, []);



  return (
    <Layout pageHeader={<PageHeader title={TITLE} subtitle={SUBTITLE} />}>
      {loading ? (
        <Progress type="steps" steps={["inProgress"]} />
      ) : (
        <>
          {siteInfo && (
            <section className="justify-between flex">
              <div className="bg-black-90 br2 pa5 flex w-40 mr5 h-auto">
                <img src={siteInfo?.lighthouse?.screenshot} alt={siteInfo?.name} />
              </div>
              <div style={{
                display: "flex",
                backgroundColor: "#FFF",
                borderRadius: "5px",
                flexDirection: "column",
                height: "100%",
                paddingBottom: "20px"
              }} className="pa5">
                <h2 className="ma0">{siteInfo?.name}</h2>
                <p style={{
                  flex: "1",
                }}>{siteInfo?.description}</p>
                <span><b>Category:</b> {siteInfo?.vertical}</span>
                <span><b>Plattform:</b> {siteInfo?.plattform}</span>
              </div>
            </section>
          )}
        </>
      )}
    </Layout>
  );
}
