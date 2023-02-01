import { writable } from "svelte/store";
import config from "./config";

const initialState = {
  siteTitle: config.siteTitle,
  posts: new Map(),
  profiles: new Map() // { [pubkey]: {name, about, picture, ...} }
};

//MOCK TEST DATA

// initialState.profiles.set(
//   "8f69ac99b96f7c4ad58b98cc38fe5d35ce02daefae7d1609c797ce3b4f92f5fd",
//   {
//     created_at: 1672073786,
//     name: "talvasconcelos",
//     about: "Setting metadata from external tool... is way cool!!",
//     picture: "https://i.imgur.com/A2oPDN2.png",
//     lud06:
//       "LNURL1DP68GURN8GHJ7AMPD3KX2AR0VEEKZAR0WD5XJTNRDAKJ7TNHV4KXCTTTDEHHWM30D3H82UNVWQHHV6TNVDHH2UMJV9KKJEF3XUGHTJT6"
//   }
// );

// initialState.posts.set("c213a474-6e42-4e26-b607-689e7190df22", {
//   author: "8f69ac99b96f7c4ad58b98cc38fe5d35ce02daefae7d1609c797ce3b4f92f5fd",
//   timestamp: 1675202049,
//   content:
//     "### Introduction\nBitcoin is a digital currency that was created in 2009 by an unknown person using the pseudonym Satoshi Nakamoto. Transactions are made with no middle men – meaning, no banks! Bitcoin can be used to book hotels on Expedia, shop for furniture on Overstock and buy Xbox games. But much of the hype is about getting rich by trading it. The price of bitcoin skyrocketed into the thousands in 2017.\n\n### Decentralized\nBitcoin is a decentralized form of currency, meaning that it is not controlled by any government or institution. Instead, it operates on a peer-to-peer network, allowing for direct transfers without the need for intermediaries. This also means that there are no transaction fees and no need to give your real name. More merchants are beginning to accept them: You can buy webhosting services, pizza or even manicures.\n\n![world of bitcoin](https://source.unsplash.com/random/1280x720/?bitcoin)\n\n### Volatility and Long-term success\nBitcoin is still a relatively new and highly volatile currency, and its long-term success is yet to be determined. Some experts have called it a bubble, while others believe it could become a widely-used form of digital currency in the future.\n\n### Blockchain and its potential\nBitcoin's underlying technology, blockchain, has the potential to revolutionize industries beyond just finance. The technology allows for secure and transparent record-keeping, and has the potential to be used in fields such as supply chain management, voting systems, and more.\n\n### Conclusion\nIn conclusion, Bitcoin is a decentralized digital currency that has the potential to change the way we think about and use money. Its underlying technology, blockchain, has far-reaching implications for various industries. Despite its volatility, it has gained a significant following and acceptance as a form of payment. Whether it will ultimately succeed or fail as a currency remains to be seen, but it has certainly sparked a conversation about the potential uses and implications of digital currencies.",
//   title:
//     "Exploring the World of Bitcoin: Decentralization, Volatility, and Blockchain",
//   slug: "exploring-the-world-of-bitcoin-decentralization-volatility-and-blockchain",
//   excerpt:
//     "Unlock the secrets of the revolutionary digital currency, Bitcoin - Decentralized transactions, volatile markets, and the potential of Blockchain technology, all in one comprehensive read!",
//   hero: "https://source.unsplash.com/random/1280x720/?bitcoin",
//   draft: false,
//   uuid: "c213a474-6e42-4e26-b607-689e7190df22"
// });

// initialState.posts.set("db7ee96d-2078-4e75-aa1e-8a1f39f65f45", {
//   author: "8f69ac99b96f7c4ad58b98cc38fe5d35ce02daefae7d1609c797ce3b4f92f5fd",
//   timestamp: 1675202061,
//   content:
//     "In a world where privacy is threatened and governments hold control over their citizens, the importance of a decentralized form of currency such as Bitcoin becomes all the more significant. In a dystopian future, where individuals may fear for their financial security, Bitcoin offers a safe haven, immune from the manipulation and control of governments and institutions.\n\n## Decentralization as a Shield\n\nIn a dystopian society, the centralization of power can lead to financial exploitation and control. With Bitcoin, however, transactions are made on a peer-to-peer network, removing the need for intermediaries and providing individuals with greater control over their own financial security. The decentralized nature of Bitcoin allows for anonymous transactions, providing a layer of protection for individuals in a world where privacy is under threat.\n\n![Bitcoin in a Dystopian World](https://source.unsplash.com/random/1280x720/?bitcoin)\n\n## Financial Security in Uncertain Times\n\nIn a dystopian future, the stability of traditional currencies may be compromised, leading to inflation and financial insecurity. Bitcoin, on the other hand, has a limited supply, and the decentralized system ensures that it is not subject to manipulation by governments or institutions. This stability, combined with its potential for growth, makes Bitcoin an attractive option for individuals looking to protect their wealth in uncertain times.\n\n## The Power of Blockchain\n\nThe technology underlying Bitcoin, blockchain, has the potential to revolutionize various industries beyond just finance. Its secure and transparent record-keeping provides a level of trust and accountability in a dystopian society where such values are often lacking. The use of blockchain in fields such as supply chain management, voting systems, and more, has the potential to bring about greater transparency and efficiency in a world where such qualities are highly valued.\n\n## Conclusion\n\nIn a dystopian future, the importance of Bitcoin as a decentralized form of currency cannot be underestimated. Its potential for providing financial security and privacy, combined with the far-reaching implications of blockchain technology, make it a valuable tool for individuals looking to protect their wealth and freedoms. As the world continues to evolve, the role of Bitcoin and other cryptocurrencies will only become increasingly significant.\n",
//   title: "Bitcoin in a Dystopian Future",
//   slug: "bitcoin-in-a-dystopian-future",
//   excerpt:
//     "In a dystopian future, the importance of Bitcoin as a decentralized form of currency cannot be underestimated. Its potential for providing financial security and privacy",
//   hero: "https://source.unsplash.com/random/1280x720/?dystopia",
//   draft: true,
//   uuid: "db7ee96d-2078-4e75-aa1e-8a1f39f65f45"
// });

export const state = writable(initialState);
