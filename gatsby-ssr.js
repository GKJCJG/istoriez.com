import React from "react";
import './gatsby-ssr.scss'

export const onRenderBody = ({ setHeadComponents, setPreBodyComponents, setPostBodyComponents }) => {
    setHeadComponents([
        <link
            key="preconnect-analytics"
            rel="preconnect"
            href="https://www.google-analytics.com"
            crossOrigin="anonymous"
        />,
        <link
            key="preconnect-doubleclick"
            rel="preconnect"
            href="https://stats.g.doubleclick.net"
            crossOrigin="anonymous"
        />,
        <link
            key="preconnect-adservice-se"
            rel="preconnect"
            href="https://adservice.google.se"
            crossOrigin="anonymous"
        />,
        <link
            key="preconnect-adservice-com"
            rel="preconnect"
            href="https://adservice.google.com"
            crossOrigin="anonymous"
        />,
        <link
            key="preconnect-pageadtwo-com"
            rel="preconnect"
            href="https://pagead2.googlesyndication.com"
            crossOrigin="anonymous"
        />
    ]);

    setPreBodyComponents([
        <script
        dangerouslySetInnerHTML={{
            __html: `
                if (typeof localStorage !== 'undefined' && typeof JSON !== 'undefined') {
                    function getFromLocalStorage(key) {
                        var value = localStorage.getItem(key);

                        return canParseJson(value) ? JSON.parse(value) : value;
                    }

                    function canParseJson(str) {
                        try {
                            JSON.parse(str);
                        } catch(e) {
                            return false;
                        }

                        return true;
                    }

                    function setClassName(className) {
                        document.body.className = className;
                    }

                    var dark = getFromLocalStorage("dark");
                    var uppercase = getFromLocalStorage("uppercase");
                    
                    if (dark && uppercase) {
                        setClassName("dark uppercase");
                    } else if (dark) {
                        setClassName("dark");
                    } else if (uppercase) {
                        setClassName("uppercase");
                    }

                    if (dark) {
                        var metaThemeColor = document.querySelector("meta[name=theme-color]");
                        metaThemeColor.setAttribute("content", "#242424");
                    }
                }
            `
        }}
    />
    ])

    setPostBodyComponents([
        <script async src="/cookieconsent.min.js"/>,
        process.env.GATSBY_SITE_LANG === 'en' ?
            <script async src="/cc-init-eng.js"/>
            :
            <script async src="/cc-init.js"/>
    ])
};

