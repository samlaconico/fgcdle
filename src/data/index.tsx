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

export const input = [
  {
    direction: 0,
    icon: <MdSouthWest />,
  },
  {
    direction: 1,
    icon: <MdSouthWest className="size-16" />,
  },
  {
    direction: 2,
    icon: <MdSouth className="size-16" />,
  },
  {
    direction: 3,
    icon: <MdSouthEast className="size-16" />,
  },
  {
    direction: 4,
    icon: <MdWest className="size-16" />,
  },
  {
    direction: 5,
    icon: <MdLens className="size-16" />,
  },
  {
    direction: 6,
    icon: <MdEast className="size-16" />,
  },
  {
    direction: 7,
    icon: <MdNorthWest className="size-16" />,
  },
  {
    direction: 8,
    icon: <MdNorth className="size-16" />,
  },
  {
    direction: 9,
    icon: <MdNorthEast className="size-16" />,
  },
];
