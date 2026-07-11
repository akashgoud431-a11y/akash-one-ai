import { useEffect, useRef } from "react";

// Social bar / popunder-style script — load once globally
export function AdsterraGlobal() {
  const loaded = useRef(false);
  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    const s = document.createElement("script");
    s.src = "https://pl30315324.effectivecpmnetwork.com/d7/0c/d9/d70cd997b2ca5c340b62fbd3e6ac3caf.js";
    s.async = true;
    document.body.appendChild(s);
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
    s.src = "https://pl30315328.effectivecpmnetwork.com/ff596ec0ccb124bdd7bb5bcd876943cd/invoke.js";
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
    <div className="hidden sm:flex w-full justify-center my-6">
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

export function AdsterraResponsiveBanner() {
  return (
    <>
      <AdsterraBanner468 />
      <AdsterraBanner320 />
    </>
  );
}
