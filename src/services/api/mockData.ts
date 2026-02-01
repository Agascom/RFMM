import { User, Event, PodcastEpisode, CoachingSession, Book, NewsArticle } from './types';

export const mockUser: User = {
  id: 'u1',
  name: 'Daniel',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIAWhjEs9kf5ijzyZiuwXASXSFOwjxLkFIWWyRq44JP5TewkzTyv6_8MVudSGlRrpkQpZSMY-wNpWr5URxnA8y9hBUpuVph4nyf1iwI5Ky5nLOyg2Pt2VG7IvosgJqGqlvfRTMjYfvt6gFBTlK6o_wMvi1eldqwVBWRtRfo1n9aNh1yCMdmO4N3odRoJJj0OwCc6rAMx_XmB8RewRlnlrXu07iOqDbF4fSF9hMc8_qoVw9zlKFOBmzrUUdQPoeOu1j2nOXnTbrJutk',
};

export const featuredEvent: Event = {
  id: 'e1',
  title: 'Annual Wisdom Summit 2024',
  date: 'This Sunday',
  description: 'Join Pastor Francis this Sunday for a transformative experience.',
  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB36N9ekSw9Ze_FxQ9_GI78hQ4OaRfKVZ53zKnKsglZKNsGo1pS0C1g-rliqbTiTIudSyDFUje0_B-ugf-zXpuKiTJ_lWvcdZBdWCprGtpQdBPmnC0RaPwsWudCrpjbYujb0Ol-KM-mBk4p-qIYqZLogNCIvbVhg8XcQl7XTTTYTqpV93FM0pGkLq-opuDf-MOENAS3WJMudgcWnJa1n0Au5Zk7MP7ZvRnh3bHqq4eHmMdC-mgd0mSPLLuMeYTP_Kd3Z_4wlIVoR8gb',
  isLive: true,
};

export const featuredPodcasts: PodcastEpisode[] = [
  {
    id: 'p1',
    title: 'Path to Grace',
    episodeNumber: 42,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAk_P96jDVIlRGcwtDeWuAOwJYUlNH5eP85VmkDZov9NnDTzvtwBRFXQmG8KeR0mClBTAWUfwczdA1W4rrfs_or3v9W2n-IiSuJx6nPQg95hioWEB88fl_yRU97BJcsWFJzc4m65MA4ctYs-6BqT-0l19OLx2mNlmbOA2bnreEo5wqNMgEwZXZ6Va_8wIb3Bes3knDAjwe-OwgMl_-W0W4jniFlJR7GHTPlzD44Viys6aYOkjMfBqMpgar9SJyZcTUe0MAptwpC2ujF',
  },
  {
    id: 'p2',
    title: 'The Inner Peace',
    episodeNumber: 15,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfKNyvZxVCceSH1_w0YHwYqXg13l_xgpIut6zqnKmwsz_N7TVjJiGun-nIeH4scRV7F8eCIMOMW5WwUjnhA9suDx3LlntsNqmYOjZvuJugt_Z_TBwl2GHUaEpMv81z3xZt_t-oFBh6OBuzjCCh7MaFK_nNo7BI2kuuzZQB9748XW3vXImy4bYoGH0Eqb0z55OlPV9M1I-1Oa6gbiwrI_FPLG2tMHYbdWGT-AsE5NO9CWd1yZF9_UmhnGiO3Pp2tCwKt93SZsF63wtx',
  },
  {
    id: 'p3',
    title: 'Daily Devotion',
    episodeNumber: 102,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPZ1urFQMpFgEXXE2GB2TMW5KaPzBTQ3B_YVmP7xEtngDx9_1K_ahD0js5_SsA-1ETkkjoK8fuW_1xVp1c2Si156yhIHSKxjYU4Qj9SEJkSpLkD3egaPtSD290RUZ6jGMcmzumqd9Ab308TUQYex-dKALuzweKhmBNURjEQtG985tQawMGHX8AAPLRipGY51sJAA3295BGj5IalVpUJ6CMMmQL3XK-uL_qr1pP3rH9dJYD5Rr1LDosjP945VEVG6WruGyUhW8yAj7w',
  },
];

export const coachingSessions: CoachingSession[] = [
  {
    id: 'c1',
    category: 'Mindset Mastery',
    title: 'Dealing with Uncertainty',
    progress: 65,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhSOu10N9ERlhJYg2HQKt_D8a0fMnP9bFVBJV7TtAviK99OGvZAQcYIP0cZVR-7HrN_Ju0wvN0cmISOOV0w_d-TqdqZWuaR3mpxZGDrm5aRFJT6QEtjhHFB0w4u8Rv_EajIb3mSscBKDdtSxvlfFfpkcOnyRvTQ5Aul8wbSQFAzMiv-ARedBTOINs6a47NE3aoIoeVAuxELXz-SGjN-OaXHO2ZtZxh_ZQy2uivotWDF5ZikVCHjnB_yOIwI39jYxeOxouJbcUnyIhL',
  },
  {
    id: 'c2',
    category: 'Leadership',
    title: 'Leading with Compassion',
    progress: 0,
    isNew: true,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDejsiP8_uNtv-Rn_EcpGuLEMi37W1xYMaryYHyVZ4LHMNzP1Z-9DgO9_46ywD_EiRoNYzzo3BgwWZ4br9BGMx2D9E_SnKeukIQaTA__QTp5H2EUJxbyY1M_d8MIReqvDJlMawxtAE_Cv4k0wuKguMaDyzxwqNSNoFMHmX8Z4o5B4gq2urHVHAjHh_dVFMBml9SS0qOp9Ek52cXypEBgkBqpetVQ6Mi7cj6ZzUO-eOkuFvKkmcDckhIrYsqIy1F8jvvx5YhlK_0HWl_',
  },
];

export const nowPlaying: PodcastEpisode = {
  id: 'np1',
  title: 'The Power of Faith',
  seriesTitle: 'Pastor Francis',
  episodeNumber: 1,
  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcu77mfugxbw4hbk-aGcPzc99BpoQmMpJ_2GpqWHVWeXUzKN2YyXhAMA25NoEghnC9HyBbnlhNeYM0NqNd7QFDhehSAi7igFobjzGudrO5bO3NYYwJLGKL3LlAVDIyDGLaE33gSkXUKX0yxOmCaw33NoYwDLu98iS5E5FR5xLPi2opP5l0pljuU8XWUU73_d3pBcDsbz_2vX0qyIfrUFkBaFHAaulAXzuJ5oC8_ks0U4iQKven1-NL1lDO6Tgv6mtiztTsjnEDR7nr',
  duration: '38:20',
};

export const books: Book[] = [
  {
    id: 'b1',
    title: "Spirit's Power",
    author: 'Francis L.',
    price: 14.99,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9odiwYq0Td8GBqp_8w0krMc28YMIj4vKI4LqUc7sISiAzYyLQZOU9wF5qaaLJH-QZmPA8N2fhuEOa5t0fcW_Ayk7yJDVrOZc6Rsuq_4WPc1NuTJCP-hwZ5U3byXqqp_Wh_l7Wh-0wcy1LStfBZTy_6jF7SWjBskwohWsnAQwj7eKmAGTwt3-3SeTsc8ee001FzkaSbECozG-ImXyE8BX6_Yp0-IZdiqHgAcsyLUIe08bxwJTkWtcwzDFSG8wwRmat3UEReZMsax62',
    type: 'ebook',
  },
  {
    id: 'b2',
    title: 'Walking in Faith',
    author: 'Francis L.',
    price: 12.99,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnwBjCRzWifZGBaFiuPK3o48yLI40-IzvlH_ZN-38Dczr4ARYvhW2zMSjlEpJfIgvSzSp6H3M4R5f65vQHJPeea8FmPGc_6xdEB12lQshvydpuPuOEiK9-UE8jwPXsCla7FQuAoVMhML8nD5QId479RS3jstOLnWQkia0BafomlNaxFpsGjDN6Rnkm4Y1EVbnSZcaUCOoDPb0b7x0zZLd5Godf1_zhzuOFzW4-HmfUYf9gZgmok98xk83LQUoUBccA906OuXOL5Cyd',
    type: 'ebook',
  },
  {
    id: 'b3',
    title: 'The Hidden Path to Grace',
    author: 'Francis L.',
    price: 19.99,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBl2jEvgnCYxD60yEDxk8DHasD6IwWNUbDc6fVTdnsa0kFKOccUX-ftdGJup-N_ixRlA6sxN8pH6LC5Q8_mrjliIoO13Ge_FQy2OfYxfeE4njptBWpaAEBzNxKYybmyeiyNYW2dJQ_P4GRBD5OoZ_G36X0P4mQC7Es6R4xAZcSFjrDu6njMygMZzpS1aiJtOrH4mQldtM18Pu8k9mcIgHnuoflYR_Z2VfQO5oUNvzne8Uoq1i6KbtlxObmQdt8J-Pzfgndnl6TRxKzh',
    type: 'audiobook',
    isBestSeller: true,
    bestSellerRank: 1,
  },
  {
    id: 'b4',
    title: 'Awakening the Soul',
    author: 'Francis L.',
    price: 9.99,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcNu19IoG0WF9CuPyEqTsd1qTgjkmFsLX8tGbnEZOXHnLpPZ0dnimsBCJy96br_k7jQ5rhaFDJ5aBnTXAj-mriR9g5o-WE_QLIJSDkK8xoiFpxjA3prnrDiABUWZJ7C7WZhgyG4QWjHCmdIlnffF_kM66o3Ndx8xBi2PUOdwAJ7RK8ajrABqP8AGO5czk2ZUbYauvBKnR32NBAhVCECxx54zY48-jzoEbsdu-WyXkiLr2A7TTw9Q3U_-EZb6aGH6vVve80fr6nIMvT',
    type: 'ebook',
    isBestSeller: true,
    bestSellerRank: 2,
  },
];

export const mainNewsArticle: NewsArticle = {
  id: 'a1',
  title: 'Pastor Francis Announces New Global Outreach Initiative',
  category: 'Global Outreach',
  publishedAt: 'October 24, 2023 • 08:45 AM',
  readTime: '5 min read',
  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDm2fAWNji3XL3AuV85_VBtk44JCX4hAZanHltn9gr9dAefZwqS256gDVo0dcdyCTFblk1hXILnhCjZ5HA_wkeYWEp13pXpHul41tqywxcZgBVay9_1JiwKtpk70Y1UPYaU59GkBrDCsDSa0D8xXAhssYDtRpv-TPCaOtI816Yul3-f3WSxWXhhwlmC9UFnwPX9vCrP0G-30NWOB5bz2qICHpT78ef4PlpepC0dP0kupAr33oyVUpN7X0v_-w2pMWb0E6AMxRWT9CXf',
  author: 'Pastor Francis Office',
  content: `In a momentous gathering yesterday at the Grand Cathedral, Pastor Francis unveiled the "Beacon of Hope" initiative, a multi-national effort aimed at providing spiritual guidance and physical resources to underserved communities across three continents.

The initiative marks a significant turning point for the ministry, shifting focus towards high-impact community centers that combine vocational training with scriptural education. "Our mission has always been to reach the heart," Pastor Francis noted during his keynote, "but we must also nourish the hands that do God's work."

"We are not just building churches; we are building sustainable futures rooted in faith and compassion."

Phase one of the rollout is scheduled to begin next month in Nairobi, followed quickly by expansions into parts of Southeast Asia and Central America. The ministry has partnered with local NGOs to ensure that the outreach is culturally resonant and addresses specific regional needs.

Supporters can expect monthly updates through the app, including live video broadcasts from the field and exclusive interviews with local project leaders.`,
  relatedArticles: [
    {
      id: 'a2',
      title: 'Nairobi Center Breaks Ground This Week',
      category: 'Update',
      publishedAt: 'Oct 20, 2023',
      readTime: '3 min read',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMCIpY0zgOLDk4L3EobGoprblN0TYNh8-C0djt5i2MAuqgbd_YcK3z2gqVOHEYALdPKNqWhaB3ZhMCUawYW_ntBXNoF5B-8Xxz5ZWytkV-Oc9O_JYejJfOlRgKBUXNUQPsPVzLOQPbTqggJ4S0uLSa5Wv9n9NZwDur3Uy0aH5TJtdNts5iCvyakJDue0Avd7xtPT5Jsrnb6DhYJ0hQxxtOP0bbeesTWGBkMxvAB90r-9GGolne7zmjUTNrxVT_HnRaFY1irY-Ru7gY',
      author: 'Ministry Team',
      content: '',
    },
    {
      id: 'a3',
      title: 'New Digital Curriculum for Study Groups',
      category: 'Resources',
      publishedAt: 'Oct 18, 2023',
      readTime: '4 min read',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmei3nqOpnjiIKpcl3nymMkNYiplib0mnVo-32xYPsLp0DhqcX-uD0bQ2x17TEI18pX-X3cqiBuzA9ypOamfau0a4JBOOCmHS9xvfHTX7plpZVQt0S2lDsr9etBRia12WniBwt7nqs_zfIz74n_R1fK7jLEfSbuYNRc8rq6nLjcTPXcDsL_VMk19Oflx9RU-UU3G-q2i5GykxRoKZgkmHSWes5cGBihciEPET72OKnjyz81ZlLLxBPA3YM6pLdX1YKOCfGVo9ZZVDp',
      author: 'Education Dept',
      content: '',
    },
  ],
};

export const libraryItems = [
    {
        ...featuredPodcasts[0], // Foundation/Path to Grace reused
        title: 'Foundations of Faith', // Different title in Library screen?
        progress: 65,
        totalDuration: '4h 20m left', // Custom field for library
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAZRUIYTrbgfQlcc3Uxh8z-bP9lhE8cQ-6ZrS_L17va9CFmK5OyOlM4qJWmUBsB5LucHNXPM5E05ehK_1cUVUcI4aC4j98BvyH2jof4dSB7Y1pEiXQUm7sb-SFGn839A7sWi473M808mwmBlu_rkf6IHnWqwLH52eWlAcFSVItrDzAaA3c9Guk8f3u4qVMV3JpGyYhrBavnfH_yt91eKQZfSTP_sgjz3WOR8gob7IzhNXXD5i73dFlGTJkW9ISKArvacDLyAf0Hh52'
    },
    {
        id: 'l2',
        title: 'The Path to Purpose',
        author: 'Pastor Francis',
        progress: 40,
        totalDuration: '8h 12m left',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxg3grwv4pjlEWDYV6TXq8FPczQqAX3U_SrzWBLCiVlbe1cSRVuDl7OZH1kCgUCksmeJ-gqvVLQCIP9fRnWnDPqM3YZbWRJHob17L0ok_c8zsICUNHhS4HBYVMzquE4Z6KpXBDf3ZsLCJ62uwgiQjPHTlMR210NFJgRWbdO4hajkakXGnZIyAnv9Vbvimm4jhmrQpGWgzEcRW2G06kOb-_mFLNISMaEOawMUYfTDm_N4HUCjZn7QfFls-KM64i8JLa-sJQ_GJrkbIZ'
    }
];

export const completedItems = [
    {
        id: 'comp1',
        title: 'Grace Abounds',
        isCompleted: true,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfpri94WzYm_Ss8BeYH2J7sQ0JG-Ssa3qZJZkPDNa2C5niZVT3isRNsecAkTaFXRyoacsgiOTj3qANPmFeMSRI5L_tuv7lIb2Uu55h07WYcC5agkNIDqRnV35GBFOFS96Fsrdr_Aq1cNrLjVTzVtmgtmfFmgmVxpIMh2B12dVrv6yIzx-cWXFzXr1nf9RGEaaFQriL2mOpHkrIA5bUKefQwiqjwfCv5NITaczsJ3X7Dzlts9e574EB3KnHsk2qiiNMcU-HX3YnpqHK'
    },
    {
        id: 'comp2',
        title: 'Morning Devotionals',
        type: 'ebook',
        size: '1.2 MB',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC24WdveCfCgVe_v7OI820UmhrmwOTwdGjBTXpJtVv_ynE_tbGk_Hh8RmwdedKgiRR6hshdDpyRY00y6rm2POvRqNAoeXaUie6gNvoM8anakUynUBRg-8P7c4hxU46lOQE9sFXcP6FHALNs5nIbAKK8BadDhS9PZwYtrsG9rEQCfsEhIkQslzHNiofsFt4vuFZmZFf8cM9LDe9WZWn7c8m8gSjbcRWiCDRZQ_qy0GVDr5rRnQfmJSUKbjDlnxyQsFlf1rGXNIv0vbTy'
    }
]
