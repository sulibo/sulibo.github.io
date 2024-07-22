/**
 * Use js from cdn
 * All config. options available here:
 * https://cookieconsent.orestbida.com/reference/configuration-reference.html
 */
import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.umd.js';

/**
 * All config. options available here:
 * https://cookieconsent.orestbida.com/reference/configuration-reference.html
 */
/**
 * All config. options available here:
 * https://cookieconsent.orestbida.com/reference/configuration-reference.html
 */
CookieConsent.run({

    // root: 'body',
    // autoShow: true,
    // disablePageInteraction: true,
    // hideFromBots: true,
    // mode: 'opt-in',
    // revision: 0,

    cookie: {
        name: 'cc_cookie',
        // domain: location.hostname,
        // path: '/',
        // sameSite: "Lax",
        // expiresAfterDays: 365,
    },

    // https://cookieconsent.orestbida.com/reference/configuration-reference.html#guioptions
    guiOptions: {
        consentModal: {
            layout: 'box',
            position: 'bottom right',
            equalWeightButtons: true,
            flipButtons: false
        },
        preferencesModal: {
            layout: 'box',
            equalWeightButtons: true,
            flipButtons: false
        }
    },

    onFirstConsent: ({ cookie }) => {
        console.log('onFirstConsent fired', cookie);
    },

    onConsent: ({ cookie }) => {
        console.log('onConsent fired!', cookie)
    },

    onChange: ({ changedCategories, changedServices }) => {
        console.log('onChange fired!', changedCategories, changedServices);
        location.reload();
    },

    onModalReady: ({ modalName }) => {
        console.log('ready:', modalName);
    },

    onModalShow: ({ modalName }) => {
        console.log('visible:', modalName);
    },

    onModalHide: ({ modalName }) => {
        console.log('hidden:', modalName);
    },

    categories: {
        necessary: {
            enabled: true,  // this category is enabled by default
            readOnly: true  // this category cannot be disabled
        },
        analytics: {
            autoClear: {
                cookies: [
                    {
                        name: /^_ga/,   // regex: match all cookies starting with '_ga'
                    },
                    {
                        name: '_gid',   // string: exact cookie name
                    }
                ]
            },

            // https://cookieconsent.orestbida.com/reference/configuration-reference.html#category-services
            services: {
                ga: {
                    label: 'Google Analytics',
                    onAccept: () => { },
                    onReject: () => { }
                },
                youtube: {
                    label: 'Youtube Embed',
                    onAccept: () => { },
                    onReject: () => { }
                },
            }
        },
        ads: {}
    },

    language: {
        default: 'en',
        translations: {
            en: {
                consentModal: {
                    title: 'This website uses cookies',
                    description: 'Hi, this website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent.',
                    acceptAllBtn: 'Accept all',
                    acceptNecessaryBtn: 'Reject all',
                    showPreferencesBtn: 'Manage Individual preferences',
                    // closeIconLabel: 'Reject all and close modal',
                    //footer: `
                    //    <a href="#path-to-impressum.html" target="_blank">Impressum</a>
                    //    <a href="#path-to-privacy-policy.html" target="_blank">Privacy Policy</a>
                    //`,
                },
                preferencesModal: {
                    title: 'Manage cookie preferences',
                    acceptAllBtn: 'Accept all',
                    acceptNecessaryBtn: 'Reject all',
                    savePreferencesBtn: 'Accept current selection',
                    closeIconLabel: 'Close modal',
                    serviceCounterLabel: 'Service|Services',
                    sections: [
                        {
                            title: 'Your Privacy Choices',
                            description: `In this panel you can express some preferences related to the processing of your personal information. You may review and change expressed choices at any time by resurfacing this panel via the provided link. To deny your consent to the specific processing activities described below, switch the toggles to off or use the “Reject all” button and confirm you want to save your choices.`,
                        },
                        {
                            title: 'Strictly Necessary',
                            description: 'These cookies are essential for the proper functioning of the website and cannot be disabled.',

                            //this field will generate a toggle linked to the 'necessary' category
                            linkedCategory: 'necessary'
                        },
                        {
                            title: 'Performance and Analytics',
                            description: 'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
                            linkedCategory: 'analytics',
                            cookieTable: {
                                caption: 'Cookie table',
                                headers: {
                                    name: 'Cookie',
                                    domain: 'Domain',
                                    desc: 'Description'
                                },
                                body: [
                                    {
                                        name: '_ga',
                                        domain: location.hostname,
                                        desc: 'Registers a unique ID that is used to generate statistical data on how the visitor uses the website.',
                                    },
                                    {
                                        name: '_gid',
                                        domain: location.hostname,
                                        desc: 'Registers a unique ID that is used to generate statistical data on how the visitor uses the website.',
                                    }
                                ]
                            }
                        },
                        {
                            title: 'Targeting and Advertising',
                            description: 'These cookies are used to make advertising messages more relevant to you and your interests. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third party advertisers.',
                            linkedCategory: 'ads',
                        },
                        {
                            title: 'More information',
                            description: 'For any queries in relation to my policy on cookies and your choices, please <a href="mailto: sulibozju@gmail.com"">contact me</a>'
                        }
                    ]
                }
            }
        }
    }
});
