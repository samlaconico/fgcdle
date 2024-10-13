import {
  MdLens,
  MdWest,
  MdNorthWest,
  MdNorth,
  MdNorthEast,
  MdEast,
  MdSouthEast,
  MdSouth,
  MdSouthWest,
} from "react-icons/md";

export const SpecialsList = [
  {
    name: "Hadouken",
    image: "/images/SF6_Ryu_236lp.png",
    input: "236",
  },
  {
    name: "Shoryuken",
    image: "/images/akuma3sshoryu.gif",
    input: "623",
  },
  {
    name: "Armament No.4α 'Flame Cage v1.43'",
    image: "/images/304px-BBCP_Kokonoe_214A.png",
    input: "214",
  },
  {
    name: "Nightshade Pulse",
    image: "/images/SF6_A.K.I._214lp.png",
    input: "214",
  },
  {
    name: "Sun Disk Palm",
    image: "/images/(orosdp).gif",
    input: "46",
  },
  {
    name: "Serpent Lash",
    image: "/images/SF6_A.K.I._236mp.png",
    input: "236",
  },
  {
    name: "Machine Gun Blow",
    image: "/images/(dudleymgb).gif",
    input: "41236",
  }
];

export const inputList = [
  {
    direction: 0,
    icon: <MdSouthWest />,
  },
  {
    direction: 1,
    icon: <MdSouthWest className="w-full h-full" />,
  },
  {
    direction: 2,
    icon: <MdSouth className="w-full h-full" />,
  },
  {
    direction: 3,
    icon: <MdSouthEast className="w-full h-full" />,
  },
  {
    direction: 4,
    icon: <MdWest className="w-full h-full" />,
  },
  {
    direction: 5,
    icon: <MdLens className="w-full h-full" />,
  },
  {
    direction: 6,
    icon: <MdEast className="w-full h-full" />,
  },
  {
    direction: 7,
    icon: <MdNorthWest className="w-full h-full" />,
  },
  {
    direction: 8,
    icon: <MdNorth className="w-full h-full" />,
  },
  {
    direction: 9,
    icon: <MdNorthEast className="w-full h-full" />,
  },
];
