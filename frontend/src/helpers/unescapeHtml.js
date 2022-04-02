const unescapeHtml = (str) =>
    new DOMParser().parseFromString(str, "text/html").documentElement
        .textContent;

export { unescapeHtml };
