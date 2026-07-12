import { useEffect, useRef } from "react";

// Social bar / popunder / direct-link scripts — load once globally
export function AdsterraGlobal() {
  const loaded = useRef(false);
  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    const urls = [
      "https://pl30315324.effectivecpmnetwork.com/d7/0c/d9/d70cd997b2ca5c340b62fbd3e6ac3caf.js",
      "https://calculatepredestinationset.com/s46uwseq4?key=e183b4424f295230b8d76e158a1365d1",
      "https://calculatepredestinationset.com/iywgz6hbyt?key=fb34b20258a6269eaaef76f39e77a650",
    ];
    for (const src of urls) {
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);
  return null;
}

// Native banner container
export function AdsterraNative() {
  const ref = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);
  useEffect(() => {
    if (loaded.current || !ref.current) return;
    loaded.current = true;
    const s = document.createElement("script");
    s.async = true;
    s.setAttribute("data-cfasync", "false");
    s.src = "https://calculatepredestinationset.com/ff596ec0ccb124bdd7bb5bcd876943cd/invoke.js";
    document.body.appendChild(s);
  }, []);
  return (
    <div className="w-full flex justify-center my-6">
      <div id="container-ff596ec0ccb124bdd7bb5bcd876943cd" ref={ref} />
    </div>
  );
}

// 468x60 desktop banner
export function AdsterraBanner468() {
  const ref = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);
  useEffect(() => {
    if (loaded.current || !ref.current) return;
    loaded.current = true;
    const conf = document.createElement("script");
    conf.type = "text/javascript";
    conf.text = `atOptions = {'key':'36ceba441f5fa53c7849fdd414d4c314','format':'iframe','height':60,'width':468,'params':{}};`;
    const inv = document.createElement("script");
    inv.type = "text/javascript";
    inv.src = "https://www.highperformanceformat.com/36ceba441f5fa53c7849fdd414d4c314/invoke.js";
    ref.current.appendChild(conf);
    ref.current.appendChild(inv);
  }, []);
  return (
    <div className="hidden sm:flex md:hidden w-full justify-center my-6">
      <div ref={ref} style={{ width: 468, height: 60 }} />
    </div>
  );
}

// 320x50 mobile banner
export function AdsterraBanner320() {
  const ref = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);
  useEffect(() => {
    if (loaded.current || !ref.current) return;
    loaded.current = true;
    const conf = document.createElement("script");
    conf.type = "text/javascript";
    conf.text = `atOptions = {'key':'130e92c33168ab6e65f645b3e2f6fda0','format':'iframe','height':50,'width':320,'params':{}};`;
    const inv = document.createElement("script");
    inv.type = "text/javascript";
    inv.src = "https://www.highperformanceformat.com/130e92c33168ab6e65f645b3e2f6fda0/invoke.js";
    ref.current.appendChild(conf);
    ref.current.appendChild(inv);
  }, []);
  return (
    <div className="flex sm:hidden w-full justify-center my-6">
      <div ref={ref} style={{ width: 320, height: 50 }} />
    </div>
  );
}

// 728x90 leaderboard banner (desktop/tablet)
export function AdsterraBanner728() {
  const ref = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);
  useEffect(() => {
    if (loaded.current || !ref.current) return;
    loaded.current = true;
    const conf = document.createElement("script");
    conf.type = "text/javascript";
    conf.text = `atOptions = {'key':'55d854931c2a745665c6769da7815eea','format':'iframe','height':90,'width':728,'params':{}};`;
    const inv = document.createElement("script");
    inv.type = "text/javascript";
    inv.src = "https://www.highperformanceformat.com/55d854931c2a745665c6769da7815eea/invoke.js";
    ref.current.appendChild(conf);
    ref.current.appendChild(inv);
  }, []);
  return (
    <div className="hidden md:flex w-full justify-center my-6">
      <div ref={ref} style={{ width: 728, height: 90 }} />
    </div>
  );
}

// 300x250 medium rectangle
export function AdsterraBanner300x250() {
  const ref = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);
  useEffect(() => {
    if (loaded.current || !ref.current) return;
    loaded.current = true;
    const conf = document.createElement("script");
    conf.type = "text/javascript";
    conf.text = `atOptions = {'key':'2a4e42a6772c44905335276ee55ef899','format':'iframe','height':250,'width':300,'params':{}};`;
    const inv = document.createElement("script");
    inv.type = "text/javascript";
    inv.src = "https://calculatepredestinationset.com/2a4e42a6772c44905335276ee55ef899/invoke.js";
    ref.current.appendChild(conf);
    ref.current.appendChild(inv);
  }, []);
  return (
    <div className="w-full flex justify-center my-6">
      <div ref={ref} style={{ width: 300, height: 250 }} />
    </div>
  );
}

export function AdsterraResponsiveBanner() {
  return (
    <>
      <AdsterraBanner728 />
      <AdsterraBanner468 />
      <AdsterraBanner320 />
      <AdsterraBanner300x250 />
    </>
  );
}
