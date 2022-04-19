import { FC, useMemo, useState } from 'react';
import { Spacing } from '@components/Spacing';
import Chainlink from '../assets/chainlink.svg';
import Chainx from '../assets/chainx.svg';
import Dipole from '../assets/dipole.svg';
import Plasm from '../assets/plasm.svg';
import PolkaWorld from '../assets/polka-world.svg';
import Subsocial from '../assets/subsocial.svg';
import Anpool from '../assets/anpool.svg';
import Phala from '../assets/phala-long.svg';
import Purestake from '../assets/purestake.svg';
import Ont from '../assets/ont.svg';
import Interlay from '../assets/interlay.svg';
import Centrifuge from '../assets/centrifuge.svg';
import Moonbeam from '../assets/moonbeam.svg';
import Onfinality from '../assets/onfinality.svg';
import Figment from '../assets/figment.svg';
import Ankr from '../assets/ankr.svg';
import Chorus from '../assets/chorus.svg';
import Snz from '../assets/snz.svg';
import Subscan from '../assets/subscan.svg';
import Ryabina from '../assets/ryabina.svg';
import P2pValidator from '../assets/p-2-p-validator.svg';
import Ren from '../assets/ren-btc.svg';
import Ampleforth from '../assets/ampleforth.png';
import Compound from '../assets/compound.png';
import Current from '../assets/current.png';
import Ellipsis from '../assets/ellipsis.svg';
import React from 'react';
import Image from 'next/image';

const list = [
  { name: 'chainlink', img: <Chainlink />, link: 'https://chain.link' },
  { name: 'chainx', img: <Chainx />, link: 'https://chainx.org/' },
  { name: 'dipole', img: <Dipole />, link: 'https://www.dipole.tech' },
  { name: 'plasm', img: <Plasm />, link: 'https://www.plasmnet.io' },
  {
    name: 'polka-world',
    img: <PolkaWorld />,
    link: 'https://www.polkaworld.org',
  },
  { name: 'subsocial', img: <Subsocial />, link: 'http://subsocial.network' },
  { name: 'anpool', img: <Anpool />, link: 'https://xanpool.com' },
  { name: 'phala', img: <Phala />, link: 'https://phala.network' },
  { name: 'centrifuge', img: <Centrifuge />, link: 'https://centrifuge.io' },
  { name: 'ont', img: <Ont />, link: 'https://ont.io' },
  { name: 'interlay', img: <Interlay />, link: 'https://www.interlay.io' },
  { name: 'moonbeam', img: <Moonbeam />, link: 'https://moonbeam.network' },
  { name: 'subscan', img: <Subscan />, link: 'https://www.subscan.io' },
  { name: 'ren-btc', img: <Ren />, link: 'https://renproject.io' },
  {
    name: 'OnFinality',
    img: <Onfinality />,
    link: 'https://www.onfinality.io',
  },
  {
    name: 'purestake',
    img: <Purestake />,
    link: 'https://www.purestake.com',
  },
  {
    name: 'figment-network',
    img: <Figment />,
    link: 'https://figment.network',
  },
  { name: 'ankr', img: <Ankr />, link: 'https://www.ankr.com' },
  { name: 'chorus', img: <Chorus />, link: 'https://chorus.one' },
  { name: 'p2pValidator', img: <P2pValidator />, link: 'https://p2p.org' },
  { name: 'snz', img: <Snz />, link: 'https://snzholding.com' },
  { name: 'ryabina', img: <Ryabina />, link: 'https://ryabina.io' },
  {
    name: 'ampleforth',
    img: <Image alt={Ellipsis} src={Ampleforth} />,
    link: 'https://www.ampleforth.org/',
  },
  { name: 'compound', img: <Image alt={Ellipsis} src={Compound} />, link: 'https://compound.finance/' },
  { name: 'current', img: <Image alt={Ellipsis} src={Current} />, link: 'https://current.com/' },
];

const List: FC<{ active: number; i: number }> = ({ active, i }) => {
  const data = useMemo(() => list.slice(i * 8, i * 8 + 8), [i]);
  const show = useMemo(() => active === i, [active, i]);

  const onClick = (link) => window.open(link);
  return (
    <div>
      {show && (
        <ul className='grid grid-cols-4 w-full h-[320px]'>
          {data.map((item) => (
            <div className='flex flex-center h-[160px] cursor-pointer' key={item.link} onClick={() => onClick(item.link)}>
              {item.img}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export const Trusted = () => {
  const len = useMemo(() => Math.ceil(list.length / 8), []);
  const [active, setActive] = useState<number>(0);
  const dotArr = new Array(len).fill(false).map((_, i) => i === active);
  return (
    <div className='bg-fff'>
      <div className='container pt-56'>
        <div className='text-[36px] leading-[44px] tracking-[0.04em] text-2e2d33 font-bold text-center'>Trusted By</div>
        <div className='h-[320px]'>
          {dotArr.map((_, i) => (
            <List active={active} i={i} key={i} />
          ))}
        </div>
        <Spacing h={10} />
        <div className='flex mx-auto w-full justify-center'>
          {dotArr.map((node, i) => {
            return node ? (
              <div className='w-10 h-10 bg-primary mx-10 cursor-pointer rounded-full' onClick={() => setActive(i)} />
            ) : (
              <div className='w-10 h-10 bg-gray-300 mx-10 cursor-pointer rounded-full' onClick={() => setActive(i)} />
            );
          })}
        </div>
        <Spacing h={20} />
      </div>
    </div>
  );
};
