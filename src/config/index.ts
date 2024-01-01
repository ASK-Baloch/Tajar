export const PRODUCT_CATEGORIES = [
    {
        label:"WATCHES",
        value:"watch-kits" as const,
        featured: [
            {
                name:"Editor Picks",
                href:"#",
                imageSrc:"/nav/watch-kits/rolex.webp"
            },
            {
                name:"New Arrival",
                href:"#",
                imageSrc:"/nav/watch-kits/apple.jpg"
            },
            {
                name:"Bestsellers",
                href:"#",
                imageSrc:"/nav/watch-kits/curren.webp"
            },
        ]
    },
    {
        label:"Art",
        value:"icons" as const,
        featured: [
            {
                name:"Favourite Icon Picks",
                href:"#",
                imageSrc:"/nav/icons/picks.png"
            },
            {
                name:"New Arrival",
                href:"#",
                imageSrc:"/nav/icons/new.webp"
            },
            {
                name:"Bestsellers",
                href:"#",
                imageSrc:"/nav/icons/bestsellers.webp"
            },
        ]
    }
]