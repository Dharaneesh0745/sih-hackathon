import { IoHome } from "react-icons/io5";
import { MdEmojiEvents, MdWorkHistory } from "react-icons/md";
import { MdOutlineRssFeed } from "react-icons/md";
import { BsCollectionPlayFill } from "react-icons/bs";
import { SiCloudflarepages } from "react-icons/si";
import { SiKubernetes } from "react-icons/si";
import { FaMedal } from "react-icons/fa6";

// navigation Data
export const navItems = [
  {
    title: "Home",
    url: "/home",
    icon: <IoHome />,
  },
  {
    title: "Jobs",
    url: "/jobs",
    icon: <MdWorkHistory />,
  },
  {
    title: "Interview",
    url: "/preperation",
    icon: <SiKubernetes />,
  },
  {
    title: "Events",
    url: "/events",
    icon: <MdEmojiEvents />,
  },
  {
    title: "Community",
    url: "/community",
    icon: <MdOutlineRssFeed />,
  },

  {
    title: "Courses",
    url: "/courses",
    icon: <BsCollectionPlayFill />,
  },

  {
    title: "Test",
    url: "/test",
    icon: <SiCloudflarepages />,
  },

  {
    title: "Rank",
    url: "/rank",
    icon: <FaMedal />,
  },
];

// branding data
// export const brandingData = [
//   {
//     id: 1,
//     title: "Free Shipping",
//     Description: "From all orders over 100$",
//     icon: (
//       <svg
//         width="36"
//         height="36"
//         viewBox="0 0 36 36"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M1 1H5.63636V24.1818H35"
//           stroke="#FFBB38"
//           stroke-width="2"
//           stroke-miterlimit="10"
//           stroke-linecap="square"
//         ></path>
//         <path
//           d="M8.72763 35.0002C10.4347 35.0002 11.8185 33.6163 11.8185 31.9093C11.8185 30.2022 10.4347 28.8184 8.72763 28.8184C7.02057 28.8184 5.63672 30.2022 5.63672 31.9093C5.63672 33.6163 7.02057 35.0002 8.72763 35.0002Z"
//           stroke="#FFBB38"
//           stroke-width="2"
//           stroke-miterlimit="10"
//           stroke-linecap="square"
//         ></path>
//         <path
//           d="M31.9073 35.0002C33.6144 35.0002 34.9982 33.6163 34.9982 31.9093C34.9982 30.2022 33.6144 28.8184 31.9073 28.8184C30.2003 28.8184 28.8164 30.2022 28.8164 31.9093C28.8164 33.6163 30.2003 35.0002 31.9073 35.0002Z"
//           stroke="#FFBB38"
//           stroke-width="2"
//           stroke-miterlimit="10"
//           stroke-linecap="square"
//         ></path>
//         <path
//           d="M34.9982 1H11.8164V18H34.9982V1Z"
//           stroke="#FFBB38"
//           stroke-width="2"
//           stroke-miterlimit="10"
//           stroke-linecap="square"
//         ></path>
//         <path
//           d="M11.8164 7.18164H34.9982"
//           stroke="#FFBB38"
//           stroke-width="2"
//           stroke-miterlimit="10"
//           stroke-linecap="square"
//         ></path>
//       </svg>
//     ),
//   },
//   {
//     id: 2,
//     title: "Daily Surprise Offers",
//     Description: "Save up to 25% off",
//     icon: (
//       <svg
//         width="32"
//         height="34"
//         viewBox="0 0 32 34"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M31 17.4502C31 25.7002 24.25 32.4502 16 32.4502C7.75 32.4502 1 25.7002 1 17.4502C1 9.2002 7.75 2.4502 16 2.4502C21.85 2.4502 26.95 5.7502 29.35 10.7002"
//           stroke="#FFBB38"
//           stroke-width="2"
//           stroke-miterlimit="10"
//         ></path>
//         <path
//           d="M30.7 2L29.5 10.85L20.5 9.65"
//           stroke="#FFBB38"
//           stroke-width="2"
//           stroke-miterlimit="10"
//           stroke-linecap="square"
//         ></path>
//       </svg>
//     ),
//   },
//   {
//     id: 4,
//     title: "Affortable Prices",
//     Description: "Get Factory direct price",
//     icon: (
//       <svg
//         width="32"
//         height="35"
//         viewBox="0 0 32 35"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M7 13H5.5C2.95 13 1 11.05 1 8.5V1H7"
//           stroke="#FFBB38"
//           stroke-width="2"
//           stroke-miterlimit="10"
//         ></path>
//         <path
//           d="M25 13H26.5C29.05 13 31 11.05 31 8.5V1H25"
//           stroke="#FFBB38"
//           stroke-width="2"
//           stroke-miterlimit="10"
//         ></path>
//         <path
//           d="M16 28V22"
//           stroke="#FFBB38"
//           stroke-width="2"
//           stroke-miterlimit="10"
//         ></path>
//         <path
//           d="M16 22C11.05 22 7 17.95 7 13V1H25V13C25 17.95 20.95 22 16 22Z"
//           stroke="#FFBB38"
//           stroke-width="2"
//           stroke-miterlimit="10"
//           stroke-linecap="square"
//         ></path>
//         <path
//           d="M25 34H7C7 30.7 9.7 28 13 28H19C22.3 28 25 30.7 25 34Z"
//           stroke="#FFBB38"
//           stroke-width="2"
//           stroke-miterlimit="10"
//           stroke-linecap="square"
//         ></path>
//       </svg>
//     ),
//   },
//   {
//     id: 5,
//     title: "Secure Payments",
//     Description: "100% protected payments",
//     icon: (
//       <svg
//         width="32"
//         height="38"
//         viewBox="0 0 32 38"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M22.6654 18.667H9.33203V27.0003H22.6654V18.667Z"
//           stroke="#FFBB38"
//           stroke-width="2"
//           stroke-miterlimit="10"
//           stroke-linecap="square"
//         ></path>
//         <path
//           d="M12.668 18.6663V13.6663C12.668 11.833 14.168 10.333 16.0013 10.333C17.8346 10.333 19.3346 11.833 19.3346 13.6663V18.6663"
//           stroke="#FFBB38"
//           stroke-width="2"
//           stroke-miterlimit="10"
//           stroke-linecap="square"
//         ></path>
//         <path
//           d="M31 22C31 30.3333 24.3333 37 16 37C7.66667 37 1 30.3333 1 22V5.33333L16 2L31 5.33333V22Z"
//           stroke="#FFBB38"
//           stroke-width="2"
//           stroke-miterlimit="10"
//           stroke-linecap="square"
//         ></path>
//       </svg>
//     ),
//   },
// ];

// categories data
export const categoriesData = [
  {
    id: 1,
    title: "Full Stack",
    subTitle: "",
    image_Url:
      "https://cdn.shopify.com/s/files/1/1706/9177/products/NEWAppleMacbookProwithM1ProChip14InchLaptop2021ModelMKGQ3LL_A_16GB_1TBSSD_custommacbd.jpg?v=1659592838",
  },
  {
    id: 2,
    title: "Front-End",
    subTitle: "",
    image_Url:
      "https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2021-07/kosme1.png",
  },
  {
    id: 3,
    title: "Back-End",
    subTitle: "",
    image_Url:
      "https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2021-07/kosme1.png",
  },
  {
    id: 4,
    title: "Data Scientist",
    subTitle: "",
    image_Url:
      "https://img.freepik.com/free-vector/ordering-goods-online-internet-store-online-shopping-niche-e-commerce-website-mother-buying-babies-clothes-footwear-toys-infant-accessories_335657-2345.jpg?w=2000",
  },
  {
    id: 5,
    title: "Cloud Computing",
    subTitle: "",
    image_Url:
      "https://img.freepik.com/free-vector/ordering-goods-online-internet-store-online-shopping-niche-e-commerce-website-mother-buying-babies-clothes-footwear-toys-infant-accessories_335657-2345.jpg?w=2000",
  },
  {
    id: 5,
    title: "App Development",
    subTitle: "",
    image_Url:
      "https://img.freepik.com/free-vector/ordering-goods-online-internet-store-online-shopping-niche-e-commerce-website-mother-buying-babies-clothes-footwear-toys-infant-accessories_335657-2345.jpg?w=2000",
  },
  {
    id: 6,
    title: "DevOps",
    subTitle: "",
    image_Url:
      "https://img.freepik.com/free-vector/devops-concept-illustration_114360-1862.jpg?w=2000",
  },
  {
    id: 7,
    title: "Cybersecurity",
    subTitle: "",
    image_Url:
      "https://img.freepik.com/free-vector/cyber-security-concept_23-2148535633.jpg?w=2000",
  },
  {
    id: 8,
    title: "AI/ML Engineer",
    subTitle: "",
    image_Url:
      "https://img.freepik.com/free-vector/ai-ml-concept-illustration_114360-4845.jpg?w=2000",
  },
  {
    id: 9,
    title: "Database Administrator",
    subTitle: "",
    image_Url:
      "https://img.freepik.com/free-vector/database-management-system-concept-illustration_114360-5789.jpg?w=2000",
  },
  {
    id: 10,
    title: "UI/UX Designer",
    subTitle: "",
    image_Url:
      "https://img.freepik.com/free-vector/ux-design-concept-illustration_114360-2332.jpg?w=2000",
  },
  {
    id: 11,
    title: "Blockchain Developer",
    subTitle: "",
    image_Url:
      "https://img.freepik.com/free-vector/blockchain-concept-illustration_114360-7705.jpg?w=2000",
  },
  {
    id: 12,
    title: "Network Engineer",
    subTitle: "",
    image_Url:
      "https://img.freepik.com/free-vector/network-engineering-concept-illustration_114360-5864.jpg?w=2000",
  },
  {
    id: 13,
    title: "Project Manager",
    subTitle: "",
    image_Url:
      "https://img.freepik.com/free-vector/project-management-concept-illustration_114360-4331.jpg?w=2000",
  },
  {
    id: 14,
    title: "QA Engineer",
    subTitle: "",
    image_Url:
      "https://img.freepik.com/free-vector/quality-assurance-concept-illustration_114360-4864.jpg?w=2000",
  },
  {
    id: 15,
    title: "Technical Support",
    subTitle: "",
    image_Url:
      "https://img.freepik.com/free-vector/technical-support-concept-illustration_114360-5374.jpg?w=2000",
  },
];

// product Data
export const jobData = [
  {
    id: 1,
    category: "Full Stack",
    name: "Full Stack",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image_Url: [
      {
        public_id: "test",
        url: "https://img.freepik.com/free-vector/web-development-isometric-concept-composition-illustration_1284-55922.jpg",
      },
      {
        public_id: "test",
        url: "https://img.freepik.com/free-vector/web-development-isometric-concept-composition-illustration_1284-55922.jpg",
      },
    ],
    shop: {
      name: "Apple inc.",
      shop_avatar: {
        public_id: "test",
        url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
      },
      ratings: 4.2,
    },
    price: 1099,
    discount_price: 1049,
    rating: 4,
    total_sell: 35,
    stock: 10,
  },
  {
    id: 2,
    category: "Full Stack",
    name: "Full Stack",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image_Url: [
      {
        public_id: "test",
        url: "https://img.freepik.com/free-vector/web-development-isometric-concept-composition-illustration_1284-55922.jpgeve",
      },
      {
        public_id: "test",
        url: "https://img.freepik.com/free-vector/web-development-isometric-concept-composition-illustration_1284-55922.jpgeve",
      },
    ],
    shop: {
      name: "Amazon Ltd",
      shop_avatar: {
        public_id: "test",
        url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
      },
      ratings: 4.2,
    },
    discount_price: 1099,
    rating: 5,
    total_sell: 80,
    stock: 10,
  },
];

export const footerProductLinks = [
  {
    name: "About us",
    link: "/about",
  },
  {
    name: "Careers",
    link: "/carrers",
  },
  {
    name: "Store Locations",
  },
  {
    name: "Our Blog",
  },
  {
    name: "Reviews",
  },
];

export const footercompanyLinks = [
  {
    name: "Home",
  },
  {
    name: "Jobs",
  },
  {
    name: "Interview Preperation",
  },
  {
    name: "Skill Test",
  },
  {
    name: "Leaderboard",
  },
];

export const footerSupportLinks = [
  {
    name: "FAQ",
  },
  {
    name: "Community",
  },
  {
    name: "Contact Us",
  },
  {
    name: "Courses",
  },
  {
    name: "Live chat",
  },
];
