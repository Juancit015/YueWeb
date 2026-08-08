const { chromium } = require("playwright");

async function waitForAvatar(page) {
  await page.goto("http://127.0.0.1:8765/web/index.html", { waitUntil: "domcontentloaded" });
  await page.locator("[data-avatar-frame]").waitFor({ state: "visible", timeout: 10000 });
  await page.waitForFunction(() => {
    const stage = document.querySelector("[data-avatar-stage]");
    const iframe = document.querySelector("[data-avatar-frame]");
    if (!stage || !iframe || !iframe.contentDocument) return false;
    return iframe.contentDocument.title === "VRM_OK" || stage.classList.contains("is-fallback");
  }, null, { timeout: 60000 });
}

async function desktopCheck(browser) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await waitForAvatar(page);
  await page.screenshot({ path: "/tmp/yue-web-desktop-ready.png", fullPage: false });

  const result = await page.evaluate(() => {
    const stage = document.querySelector("[data-avatar-stage]");
    const iframe = document.querySelector("[data-avatar-frame]");
    if (stage.classList.contains("is-fallback")) return { fallback: true, nonBlankPixels: 1 };
    const canvas = iframe.contentDocument.querySelector("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const sample = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let nonBlankPixels = 0;
    for (let i = 0; i < sample.length; i += 4) {
      if (sample[i + 3] > 0 && (sample[i] > 4 || sample[i + 1] > 4 || sample[i + 2] > 4)) {
        nonBlankPixels += 1;
      }
    }
    return { fallback: false, nonBlankPixels };
  });

  if (result.nonBlankPixels <= 1000) {
    throw new Error(`Avatar canvas appears blank: ${JSON.stringify(result)}`);
  }
  await page.close();
  return result;
}

async function mobileCheck(browser) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await waitForAvatar(page);
  await page.screenshot({ path: "/tmp/yue-web-mobile-ready.png", fullPage: false });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (overflow > 1) {
    throw new Error(`Mobile horizontal overflow: ${overflow}px`);
  }
  await page.close();
  return { overflow };
}

(async () => {
  const browser = await chromium.launch();
  try {
    const desktop = await desktopCheck(browser);
    const mobile = await mobileCheck(browser);
    console.log(JSON.stringify({ ok: true, desktop, mobile }, null, 2));
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
