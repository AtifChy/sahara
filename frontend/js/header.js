import { initSearch } from "/js/search.js";

function getHeaderUrl() {
  return "/partials/header.html";
}

async function injectHeader() {
  const mount = document.getElementById("header");
  if (!mount) return;

  try {
    const res = await fetch(getHeaderUrl());
    if (!res.ok) throw new Error("Failed to fetch header: " + res.statusText);

    const html = await res.text();
    mount.innerHTML = html;

    highlightActiveLink(mount);

    initSearch();
  } catch (err) {
    console.error(err);
  }
}

function highlightActiveLink(scope) {
  const path = window.location.pathname.split("/").pop() ?? "";
  const links = scope.querySelectorAll("nav a[href]");
  links.forEach((link) => {
    const herf = link.getAttribute("href")?.split("/").pop();
    if (herf === path) {
      link.setAttribute("aria-current", "page");
    }
  });
}

document.addEventListener("DOMContentLoaded", injectHeader);
