import { useEffect, useRef, useState } from 'react'

import {
  Flex,
  Input,
  Button,
  Box,
  SimpleGrid,
  Image as ChakraImage,
  Heading,
  Icon,
} from '@chakra-ui/react'

import {
  Document,
  Page,
  Text,
  View,
  Image,
  Font,
  Canvas,
  StyleSheet,
  Svg,
  Path
} from '@react-pdf/renderer';

const PDFViewer = dynamic(() => import('@react-pdf/renderer').then((module) => module.PDFViewer), {
  ssr: false,
});

const PDFLink = dynamic(() => import('@react-pdf/renderer').then((module) => module.PDFDownloadLink), {
  ssr: false,
});

import dynamic from 'next/dynamic'

import AccordionComponent from '@/components/Accordion/Accordion';
import { Inputs } from '@/components/Inputs/Inputs';
import { InputColor } from '@/components/Inputs/InputColor';
import SelectInput from '@/components/Inputs/Select';
import Select from '@/components/Inputs/Select';

import "react-quill/dist/quill.snow.css";

import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';

import { FiUpload } from 'react-icons/fi';
import { GrUpdate } from 'react-icons/gr';
import { GiWineBottle } from 'react-icons/gi';
import { BsArrowUpCircleFill, BsFileImageFill, BsFillPlusCircleFill, BsFillTrashFill, BsFillXCircleFill } from 'react-icons/bs';
import Head from 'next/head';

interface Wine {
  name: string;
  volume: string;
  type: string;
  vineyard: string;
  pairing: string;
  price: string;
  image: string;
  instagram?: string;
  whatsapp?: string;
  site?: string;
}

type TextAlign = 'left' | 'center' | 'right' | 'justify';



export default function Home() {


  Font.register({
    family: 'Ubuntu',
    fonts: [
      {
        src: 'https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf',
      },
      {
        src: 'https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf',
        fontWeight: 'bold',
      },
      {
        src: 'https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf',
        fontWeight: 'normal',
        fontStyle: 'italic',
      },
    ],
  });

  Font.register({
    family: 'Koshy',
    fonts: [
      {
        src: './fonts/Koshy.ttf',
      },
      {
        src: './fonts/Koshy.ttf',
        fontWeight: 'bold',
      },
      {
        src: './fonts/Koshy.ttf',
        fontWeight: 'normal',
        fontStyle: 'italic',
      },
    ]
  })

  Font.register({
    family: 'Adam',
    fonts: [
      {
        src: './fonts/Adam.otf',
      },
      {
        src: './fonts/Adam.otf',
        fontWeight: 'bold',
      },
      {
        src: './fonts/Adam.otf',
        fontWeight: 'normal',
        fontStyle: 'italic',
      },
    ]
  })

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [firstPageBackground, setFirstPageBackground] = useState('#FFF');

  const [paperBackground, setPaperBackground] = useState('#3E1E24');

  const [imageDimensions, setImageDimensions] = useState({ width: 100, height: 100 });
  const [image, setImage] = useState('null');

  const [titleColor, setTitleColor] = useState('#BB975E');
  const [titleSize, setTitleSize] = useState(35);
  const [wineFontFamily, setWineFontFamily] = useState('Ubuntu');

  const [wines, setWines] = useState<Wine[]>([]);
  const [title, setTitle] = useState('Carta de Vinho');
  const [wineName, setWineName] = useState('Angelica Zapata 750 ml');
  const [wineVolume, setWineVolume] = useState('Malbec-Malbec, 2018');
  const [wineType, setWineType] = useState('Vinho da vinícula Catena Zapata, tradicional na região de Mendonza na Argentina. Harmoniza perfeitamente com carnes vermelhas.');
  const [wineVineyard, setWineVineyard] = useState('Argentina');
  const [winePairing, setWinePairing] = useState('Carne vermelha');
  const [winePrice, setWinePrice] = useState('R$450,00');

  const [loading, setLoading] = useState(false);

  const [wineContainerPosition, setWineContainerPosition] = useState({ x: 0, y: 0 });

  const [wineNameFontSize, setWineNameFontSize] = useState(16);
  const [wineNameFontColor, setWineNameFontColor] = useState('#DDCCB2');
  const [wineNameTextAlign, setWineNameTextAlign] = useState<TextAlign>('left');
  const [wineNamePosition, setWineNamePosition] = useState({ x: 0, y: 0 });

  const [wineVolumeFontSize, setWineVolumeFontSize] = useState(14);
  const [wineVolumeFontColor, setWineVolumeFontColor] = useState('#DDCCB2');
  const [wineVolumePosition, setWineVolumePosition] = useState({ x: 0, y: 0 });

  const [wineTypeFontSize, setWineTypeFontSize] = useState(14);
  const [wineTypeFontColor, setWineTypeFontColor] = useState('#DDCCB2');
  const [wineTypePosition, setWineTypePosition] = useState({ x: 0, y: 0 });

  const [wineVineyardFontSize, setWineVineyardFontSize] = useState(14);
  const [wineVineyardFontColor, setWineVineyardFontColor] = useState('#DDCCB2');

  const [winePairingFontSize, setWinePairingFontSize] = useState(14);
  const [winePairingFontColor, setWinePairingFontColor] = useState('#DDCCB2');

  const [winePriceFontSize, setWinePriceFontSize] = useState(14);
  const [winePriceFontColor, setWinePriceFontColor] = useState('#DDCCB2');

  const [borderSize, setBorderSize] = useState(1);
  const [borderColor, setBorderColor] = useState('#BB975E');
  const [borderRadius, setBorderRadius] = useState(10);
  const [borderStyle, setBorderStyle] = useState('solid');

  const [indice, setIndice] = useState(0);

  const [display, setDisplay] = useState('flex');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const logoTypes = [
    'logoPreta.png',
    'logoBranca.png',
    'subLogoRosa.png',
    'subLogoAzulClaro.png',
    'subLogoAzulEscuro.png',
  ]

  const [logo, setLogo] = useState(logoTypes[0]);

  const [socialFontFamily, setSocialFontFamily] = useState('Ubuntu');

  const [instagram, setInstagram] = useState('@');
  const [instagramFontSize, setInstagramFontSize] = useState(12);
  const [instagramFontColor, setInstagramFontColor] = useState('#BB975E');

  const [whatsapp, setWhatsapp] = useState('34');
  const [whatsappFontSize, setWhatsappFontSize] = useState(12);
  const [whatsappFontColor, setWhatsappFontColor] = useState('#BB975E');

  const [site, setSite] = useState('www');
  const [siteFontSize, setSiteFontSize] = useState(12);
  const [siteFontColor, setSiteFontColor] = useState('#BB975E');

  const [cardDate, setCardDate] = useState('01/01/2021');
  const [cardDateFontSize, setCardDateFontSize] = useState(12);
  const [cardDateFontColor, setCardDateFontColor] = useState('#BB975E');

  const handleLogoChange = () => {
    const index = logoTypes.indexOf(logo);
    if (index === logoTypes.length - 1) {
      setLogo(logoTypes[0]);
    } else {
      setLogo(logoTypes[index + 1]);
    }
  }

  useEffect(() => {
    if (logo === 'subLogoRosa.png') {
      setFirstPageBackground('#FCDCDC');
      setInstagramFontColor('#911746');
      setWhatsappFontColor('#911746');
      setSiteFontColor('#911746');
      setCardDateFontColor('#911746');
      setDisplay('none');
    } else if (logo === 'subLogoAzulClaro.png') {
      setFirstPageBackground('#00324A');
      setInstagramFontColor('#A7BFCC');
      setWhatsappFontColor('#A7BFCC');
      setSiteFontColor('#A7BFCC');
      setCardDateFontColor('#A7BFCC');
      setDisplay('none');
    } else if (logo === 'subLogoAzulEscuro.png') {
      setFirstPageBackground('#A7BFCC');
      setInstagramFontColor('#00324A');
      setWhatsappFontColor('#00324A');
      setSiteFontColor('#00324A');
      setCardDateFontColor('#00324A');
      setDisplay('none');
    }
  }, [logo])

  //Adicionar seções de vinhos pré definidas e quando o usuário clicar em adicionar um vinho, adicionar um vinho na seção selecionada

  const [sections, setSections] = useState([
    {
      name: 'Carta de Vinhos',
    }
  ]);

  const addWine = () => {
    setWines([...wines, {
      name: wineName,
      volume: wineVolume,
      type: wineType,
      vineyard: wineVineyard,
      pairing: winePairing,
      price: winePrice,
      image: image,
      instagram: instagram,
      whatsapp: whatsapp,
      site: site,
    }])
  }

  const handleAddImage = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result as string);
    }
  }

  const handleResize = (event: any, { size }: any) => {
    setImageDimensions({ width: size.width, height: size.height });
  };

  const borderTypes = ['solid', 'dotted', 'dashed'];

  const removeLastWine = () => {
    const newWines = wines.slice(0, wines.length - 1);
    setWines(newWines);
  }

  const editWine = () => {
    const newWines = wines.map((wine, index) => {
      if (index === indice) {
        return {
          name: wineName,
          volume: wineVolume,
          type: wineType,
          vineyard: wineVineyard,
          pairing: winePairing,
          price: winePrice,
          image: image,
        }
      }
      return wine;
    })
    setWines(newWines);
  }

  const styles = StyleSheet.create({
    firstPage: {
      flexDirection: 'row',
      backgroundColor: firstPageBackground
    },
    firstSectionPage: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%'
    },
    lastSectionPage: {
      width: '100%',
      height: '100%'
    },
    logoImage: {
      //Evitar que a imagem fique muito grande 
      width: '250',
      height: '180',
      justifyContent: 'center',
      alignItems: 'center',
    },
    page: {
      flexDirection: 'row',
      backgroundColor: paperBackground,
    },
    header: {
      margin: 10,
      padding: 10,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 20,
      marginVertical: 10,
      padding: 10,
      borderRadius: borderRadius,
      border: `${borderSize}px ${borderStyle} ${borderColor}`,
      marginTop: 80,
    },
    subLogoCard: {
      //Este card deve ficar na parte direita inferior da página
      position: 'absolute',
      bottom: 0,
      right: 0,
      margin: 10,
      padding: 10,
    },
    subLogoImage: {
      width: 75,
      height: 70,
    },
    subLogoImageContainer: {
      width: 120,
      height: 110,
      justifyContent: 'center',
    },
    image: {
      width: 100,
      height: 200,
      marginRight: 5,
      marginLeft: 10,
    },
    details: {
      flex: 1,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
      width: '100%',
      height: '100%',
    },
    flex: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      color: titleColor,
      fontSize: titleSize,
      position: 'absolute',
      // marginTop: 10,
      // top: position.y,
      // left: position.x,
      top: 10,
      margin: 30,
      textAlign: 'center',
      fontFamily: wineFontFamily,
      fontWeight: 'bold',
    },
    lastPageText: {
      color: siteFontColor,
      fontSize: '12',
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      textAlign: 'center',
    },
    wineName: {
      fontSize: wineNameFontSize,
      fontFamily: wineFontFamily,
      color: wineNameFontColor,
      top: wineNamePosition.y,
      left: wineNamePosition.x,
      fontWeight: 'bold',
      textAlign: wineNameTextAlign,
    },
    wineVolume: {
      fontSize: wineVolumeFontSize,
      fontStyle: 'italic',
      color: wineVolumeFontColor,
      marginBottom: 2,
      fontFamily: wineFontFamily,
      top: wineVolumePosition.y,
      left: wineVolumePosition.x,
      textAlign: wineNameTextAlign,

    },
    wineType: {
      fontSize: 12,
      marginTop: 2,
      fontFamily: wineFontFamily,
      color: wineTypeFontColor,
      marginBottom: 2,
    },
    wineVineyard: {
      fontSize: 10,
      marginTop: 2,
      color: wineVineyardFontColor,
      marginBottom: 2,
      fontFamily: wineFontFamily,
    },
    winePairing: {
      fontSize: 10,
      marginTop: 2,
      color: winePairingFontColor,
      marginBottom: 2,
      fontFamily: wineFontFamily,
    },
    winePrice: {
      fontSize: 12,
      marginTop: 2,
      fontWeight: 'bold',
      fontFamily: wineFontFamily,
      color: winePriceFontColor,
      marginBottom: 2,
    },
    instagram: {
      fontSize: 12,
      marginTop: 2,
      fontWeight: 'bold',
      fontFamily: wineFontFamily,
      color: instagramFontColor,
      marginBottom: 2,
      marginLeft: 5,
      textAlign: 'center',
    },
    whatsapp: {
      fontSize: 12,
      marginTop: 2,
      fontWeight: 'bold',
      fontFamily: wineFontFamily,
      color: whatsappFontColor,
      marginBottom: 2,
      marginLeft: 5,
    },
    website: {
      fontSize: 12,
      marginTop: 2,
      fontWeight: 'bold',
      fontFamily: wineFontFamily,
      color: siteFontColor,
      marginBottom: 2,
      marginLeft: 5,
    },
    cardDate: {
      fontSize: 12,
      marginTop: 2,
      fontWeight: 'bold',
      fontFamily: wineFontFamily,
      color: cardDateFontColor,
      marginBottom: 2,
    },
    //Svg e texto lado a lado
    containerLogo: {
      marginTop: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    lastPageTextContainer: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
    },
    lastPageSocialContainer: {
      marginTop: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    lastPagePayment: {
      marginTop: 50,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
    lastPageFooter: {
      marginTop: 50,
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      textAlign: 'center',
    },
    flexSvg: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 10,
    },
    textContainer: {
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      textAlign: 'center',
    },
  });


  const MyDocument = (
    <Document>
      <Page size="A4" style={styles.firstPage} wrap={false}>
        <View style={styles.firstSectionPage}>
          <Image style={styles.logoImage} src={logo} />
        </View>
      </Page>
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={styles.section}>
          <Text style={styles.title}>
            {title}
          </Text>
          {wines.map((wine, index) => (
            <View style={styles.container} key={index}>
              <View style={styles.details}>
                <View style={styles.flex}>
                  <Text style={styles.wineName}>{wine.name}</Text>
                </View>
                <Text style={styles.wineVolume}>{wine.volume}</Text>
                <Text style={styles.wineType}>{wine.type}</Text>
                <Text style={styles.wineVineyard}>{wine.vineyard}</Text>
                <Text style={styles.winePairing}>{wine.pairing}</Text>
                <Text style={styles.winePrice}>{wine.price}</Text>
              </View>
              <View style={styles.subLogoImageContainer}>
                <Image src={wine.image} />
              </View>
            </View>
          ))}
          <View style={styles.subLogoCard}>
            <Image style={styles.subLogoImage} src={logo} />
          </View>
        </View>
      </Page>
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={styles.section}>
          <Text style={styles.title}>
            {title}
          </Text>
          {wines.map((wine, index) => (
            <View style={styles.container} key={index}>
              <View style={styles.details}>
                <View style={styles.flex}>
                  <Text style={styles.wineName}>{wine.name}</Text>
                </View>
                <Text style={styles.wineVolume}>{wine.volume}</Text>
                <Text style={styles.wineType}>{wine.type}</Text>
                <Text style={styles.wineVineyard}>{wine.vineyard}</Text>
                <Text style={styles.winePairing}>{wine.pairing}</Text>
                <Text style={styles.winePrice}>{wine.price}</Text>
              </View>
              <Image style={styles.image} src={wine.image} />
            </View>
          ))}
          <View style={styles.subLogoCard}>
            <Image style={styles.subLogoImage} src={logo} />
          </View>
        </View>
      </Page>
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={styles.section}>
          <Text style={styles.title}>
            Vinhos Tintos
          </Text>
          {wines.map((wine, index) => (
            <View style={styles.container} key={index}>
              <View style={styles.details}>
                <View style={styles.flex}>
                  <Text style={styles.wineName}>{wine.name}</Text>
                </View>
                <Text style={styles.wineVolume}>{wine.volume}</Text>
                <Text style={styles.wineType}>{wine.type}</Text>
                <Text style={styles.wineVineyard}>{wine.vineyard}</Text>
                <Text style={styles.winePairing}>{wine.pairing}</Text>
                <Text style={styles.winePrice}>{wine.price}</Text>
              </View>
              <Image style={styles.image} src={wine.image} />
            </View>
          ))}
          <View style={styles.subLogoCard}>
            <Image style={styles.subLogoImage} src={logo} />
          </View>
        </View>
      </Page>
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={styles.section}>
          <Text style={styles.title}>
            Vinhos Brancos
          </Text>
          {wines.map((wine, index) => (
            <View style={styles.container} key={index}>
              <View style={styles.details}>
                <View style={styles.flex}>
                  <Text style={styles.wineName}>{wine.name}</Text>
                </View>
                <Text style={styles.wineVolume}>{wine.volume}</Text>
                <Text style={styles.wineType}>{wine.type}</Text>
                <Text style={styles.wineVineyard}>{wine.vineyard}</Text>
                <Text style={styles.winePairing}>{wine.pairing}</Text>
                <Text style={styles.winePrice}>{wine.price}</Text>
              </View>
              <Image style={styles.image} src={wine.image} />
            </View>
          ))}
          <View style={styles.subLogoCard}>
            <Image style={styles.subLogoImage} src={logo} />
          </View>
        </View>
      </Page>
      <Page size="A4" style={styles.firstPage} wrap={false}>
        <View style={styles.lastSectionPage}>
          {/* <View style={styles.containerLastPageLogo}>
            <Image style={styles.subLogoImage} src={logo} />
          </View> */}
          <View style={styles.lastPageTextContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.lastPageText}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex laborum eaque, a soluta in sed labore assumenda voluptates illo illum mollitia porro magnam, possimus iusto, id quis incidunt ducimus alias?
              </Text>
            </View>
            <View style={styles.lastPageSocialContainer}>
              <View style={styles.flexSvg}>
                <Svg width={16} height={16}>
                  <Path
                    d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
                    color={siteFontColor}
                    fill={siteFontColor}
                    strokeWidth={3}
                  />
                </Svg>
                <Text style={styles.instagram}> {instagram}</Text>
              </View>
              <View style={styles.flexSvg}>
                <Svg width={16} height={16}>
                  <Path
                    d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"
                    color={siteFontColor}
                    fill={siteFontColor}
                    strokeWidth={3}
                  />
                </Svg>
                <Text style={styles.whatsapp}>{whatsapp}</Text>
              </View>
              <View style={styles.flexSvg}>
                <Svg width={16} height={16}>
                  <Path
                    d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                    color={siteFontColor}
                    fill={siteFontColor}
                    strokeWidth={3}
                  />
                </Svg>
                <Text style={styles.website}> {site}</Text>
              </View>
              </View>
              <View style={styles.lastPagePayment}>
                <Text style={styles.cardDate}>Formas de Pagamento</Text>
                <View style={styles.flexSvg}>
                  <Svg width={16} height={16}>
                    <Path
                      d="M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0v-3Zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5ZM.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5Zm15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5ZM4 4h1v1H4V4Z"
                      color={siteFontColor}
                      fill={siteFontColor}
                      strokeWidth={3}
                    />
                    <Path
                      d="M7 2H2v5h5V2ZM3 3h3v3H3V3Zm2 8H4v1h1v-1Z"
                      color={siteFontColor}
                      fill={siteFontColor}
                      strokeWidth={3}
                    />
                    <Path
                      d="M7 9H2v5h5V9Zm-4 1h3v3H3v-3Zm8-6h1v1h-1V4Z"
                      color={siteFontColor}
                      fill={siteFontColor}
                      strokeWidth={3}
                    />
                    <Path
                      d="M9 2h5v5H9V2Zm1 1v3h3V3h-3ZM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8H8Zm2 2H9V9h1v1Zm4 2h-1v1h-2v1h3v-2Zm-4 2v-1H8v1h2Z"
                      color={siteFontColor}
                      fill={siteFontColor}
                      strokeWidth={3}
                    />
                    <Path
                      d="M12 9h2V8h-2v1Z"
                      color={siteFontColor}
                      fill={siteFontColor}
                      strokeWidth={3}
                    />
                  </Svg>
                  <Text style={styles.instagram}>Pix</Text>
                </View>
                <View style={styles.flexSvg}>
                  <Svg width={16} height={16}>
                    <Path
                      d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"
                      color={siteFontColor}
                      fill={siteFontColor}
                      strokeWidth={3}
                    />
                    <Path
                      d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"
                      color={siteFontColor}
                      fill={siteFontColor}
                      strokeWidth={3}
                    />
                  </Svg>
                  <Text style={styles.instagram}>Cartão</Text>
                </View>                
                <View style={styles.flexSvg}>
                  <Svg width={16} height={16}>
                    <Path
                      d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1H1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                      color={siteFontColor}
                      fill={siteFontColor}
                      strokeWidth={3}
                    />
                    <Path
                      d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2H3z"
                      color={siteFontColor}
                      fill={siteFontColor}
                      strokeWidth={3}
                    />
                  </Svg>
                  <Text style={styles.instagram}>Dinheiro</Text>
                </View>
              </View>
            </View>
            <View style={styles.lastPageFooter}>
              <Text style={styles.cardDate}>Carta de vinhos gerada em {cardDate}</Text>
            </View>
          </View>
      </Page>
    </Document>
  )

  {/* <View style={styles.containerLogo}>
            <Svg>
              <Path
                d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
                color="#BB975E"
                fill="#BB975E"
                strokeWidth={3}
              />
            </Svg>
            <Text style={styles.lastPageText}> A carta de vinhos foi gerada pelo site: </Text>
          </View>
          <Svg>
            <Path
              d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"
              color="#BB975E"
              fill="#BB975E"
              strokeWidth={3}
            />
          </Svg>
          <Svg>
            <Path
              d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
              color="#BB975E"
              fill="#BB975E"
              strokeWidth={3}
            />
          </Svg>
          <Svg>
            <Path
              d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103zM2.25 8.184l3.897 1.67a.5.5 0 0 1 .262.263l1.67 3.897L12.743 3.52 2.25 8.184z"
              color="#BB975E"
              fill="#BB975E"
              strokeWidth={3}
            />
          </Svg> */}


  const PDFView = () => {
    return (
      <div style={{ width: '50%', height: '800px' }}>
        <PDFViewer width="100%" height="100%" showToolbar={false}>
          {MyDocument}
        </PDFViewer>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Gerador de carta de vinhos</title>
      </Head>
      <Box w="100%" h="100%" bg="gray.100" p="20">
        <Flex direction="column" align="center" justify="center" mt={5}>
          <Box w="80%" mb='4' flex={1}>
            <Heading as="h1" size="lg" color="gray.700" mr="4" textAlign="center">
              Gerador de carta de vinhos
            </Heading>
            <Heading as="h2" size="md" color="gray.600" mr="4" textAlign="center">
              Crie sua carta de vinhos de forma simples e rápida
            </Heading>
          </Box>
          <Box bg="white" p="4" borderRadius="md" shadow="md" w="80%" mb='4'>
            <AccordionComponent title="Configurações" mt="4">
              <Flex>
                <Select onChange={handleLogoChange} value={logo} label='Logo' options={logoTypes} name="logo" mr="4" />
                <Box w={['40%', '40%', '60%', '60%']} mr="4">
                  <Inputs onChange={(event) => setTitle(event.target.value)} value={title} label='Título' />
                </Box>
                <Select onChange={(event) => setWineFontFamily(event.target.value)} value={wineFontFamily} label='Fonte' options={['Ubuntu', 'Koshy', 'Adam']} name="font" />
              </Flex>
              <Flex mt="4">
                <Box w={['20%', '20%', '20%', '20%']} mr="4">
                  <InputColor onChange={(event) => setTitleColor(event.target.value)} value={titleColor} label='Cor do título' />
                </Box>
                <Box w={['20%', '20%', '20%', '20%']} mr="4" display={display}>
                  <InputColor onChange={(event) => setFirstPageBackground(event.target.value)} value={firstPageBackground} label='Cor do papel' />
                </Box>
                <Box w={['20%', '20%', '20%', '20%']} mr="4">
                  <InputColor onChange={(event) => setPaperBackground(event.target.value)} value={paperBackground} label='Cor do papel' />
                </Box>
                <Box w={['40%', '40%', '60%', '60%']} mr="4">
                  <Inputs mr="10" onChange={(event) => setBorderSize(event.target.value)} value={borderSize} label='Tamanho da borda' />
                </Box>
                <Box w={['20%', '20%', '20%', '20%']} mr="4">
                  <InputColor onChange={(event) => setBorderColor(event.target.value)} value={borderColor} label='Cor da borda' />
                </Box>
                <Box w={['20%', '20%', '20%', '20%']} mr="4">
                  <Inputs mr="4" onChange={(event) => setBorderRadius(event.target.value)} value={borderRadius} label='Raio da borda' />
                </Box>
                <Box w={['20%', '20%', '20%', '20%']} mr="4">
                  <SelectInput onChange={(event) => setBorderStyle(event.target.value)} value={borderStyle} label='Estilo da borda' options={borderTypes} name="border" />
                </Box>
              </Flex>
            </AccordionComponent>
            <AccordionComponent title="Seção do vinho" mt="4">
              <Flex>
              </Flex>
            </AccordionComponent>
            <AccordionComponent title="Nome" mt="4">
              <Flex>
                <Box w="60%" mr="4">
                  <Inputs onChange={(event) => setWineName(event.target.value)} value={wineName} label='Nome do vinho' />
                </Box>
                <Box w="20%" mr="4">
                  <Inputs onChange={(event) => setWineNameFontSize(event.target.value)} value={wineNameFontSize} label='FontSize' />
                </Box>
                <Box w="20%">
                  <InputColor onChange={(event) => setWineNameFontColor(event.target.value)} value={wineNameFontColor} label='Cor' />
                </Box>
              </Flex>
            </AccordionComponent>
            <AccordionComponent title="Volume" mt="4">
              <Flex>
                <Box w="60%" mr="4">
                  <Inputs onChange={(event) => setWineVolume(event.target.value)} value={wineVolume} label='Volume' />
                </Box>
                <Box w="20%" mr="4">
                  <Inputs onChange={(event) => setWineVolumeFontSize(event.target.value)} value={wineVolumeFontSize} label='Volume' />
                </Box>
                <Box w="20%">
                  <InputColor onChange={(event) => setWineVolumeFontColor(event.target.value)} value={wineVolumeFontColor} label='Cor' />
                </Box>
              </Flex>
            </AccordionComponent>
            <AccordionComponent title="Tipo" mt="4">
              <Flex>
                <Box w={['40%', '40%', '60%', '60%']} mr="4">
                  <Inputs onChange={(event) => setWineType(event.target.value)} value={wineType} label='Tipo' />
                </Box>
                <Box w={['30%', '30%', '20%', '20%']} mr="4">
                  <Inputs onChange={(event) => setWineTypeFontSize(event.target.value)} value={wineTypeFontSize} label='Volume' />
                </Box>
                <Box w={['30%', '30%', '20%', '20%']}>
                  <InputColor onChange={(event) => setWineTypeFontColor(event.target.value)} value={wineTypeFontColor} label='Cor' />
                </Box>
              </Flex>
            </AccordionComponent>
            <AccordionComponent title="Vinícola" mt="4">
              <Flex>
                <Box w={['40%', '40%', '60%', '60%']} mr="4">
                  <Inputs onChange={(event) => setWineVineyard(event.target.value)} value={wineVineyard} label='Vinícola' />
                </Box>
                <Box w={['30%', '30%', '20%', '20%']} mr="4">
                  <Inputs onChange={(event) => setWineVineyardFontSize(event.target.value)} value={wineVineyardFontSize} label='Volume' />
                </Box>
                <Box w={['30%', '30%', '20%', '20%']}>
                  <InputColor onChange={(event) => setWineVineyardFontColor(event.target.value)} value={wineVineyardFontColor} label='Cor' />
                </Box>
              </Flex>
            </AccordionComponent>
            <AccordionComponent title="Harmonização" mt="4">
              <Flex>
                <Box w={['40%', '40%', '60%', '60%']} mr="4">
                  <Inputs onChange={(event) => setWinePairing(event.target.value)} value={winePairing} label='Harmonização' />
                </Box>
                <Box w={['30%', '30%', '20%', '20%']} mr="4">
                  <Inputs onChange={(event) => setWinePairingFontSize(event.target.value)} value={winePairingFontSize} label='Volume' />
                </Box>
                <Box w={['30%', '30%', '20%', '20%']}>
                  <InputColor onChange={(event) => setWinePairingFontColor(event.target.value)} value={winePairingFontColor} label='Cor' />
                </Box>
              </Flex>
            </AccordionComponent>
            <AccordionComponent title="Preço" mt="4">
              <Flex>
                <Box w={['40%', '40%', '60%', '60%']} mr="4">
                  <Inputs onChange={(event) => setWinePrice(event.target.value)} value={winePrice} label='Preço' />
                </Box>
                <Box w={['30%', '30%', '20%', '20%']} mr="4">
                  <Inputs onChange={(event) => setWinePriceFontSize(event.target.value)} value={winePriceFontSize} label='Volume' />
                </Box>
                <Box w={['30%', '30%', '20%', '20%']}>
                  <InputColor onChange={(event) => setWinePriceFontColor(event.target.value)} value={winePriceFontColor} label='Cor' />
                </Box>
              </Flex>
            </AccordionComponent>
            <AccordionComponent title="Sociais" mt="4">
              <Flex>
                <Box w={['30%', '30%', '20%', '20%']} mr="4">
                  <Inputs onChange={(event) => setInstagram(event.target.value)} value={instagram} label='Instagram' />
                </Box>
                <Box w={['30%', '30%', '20%', '20%']} mr="4">
                  <Inputs onChange={(event) => setWhatsapp(event.target.value)} value={whatsapp} label='Whatsapp' />
                </Box>
                <Box w={['30%', '30%', '20%', '20%']} mr="4">
                  <Inputs onChange={(event) => setSite(event.target.value)} value={site} label='Site' />
                </Box>
                <Box w={['30%', '30%', '20%', '20%']} mr="4">
                  <Inputs onChange={(event) => setCardDate(event.target.value)} value={cardDate} label='Data' />
                </Box>
              </Flex>
              <Flex>
                <Box w={['30%', '30%', '20%', '20%']} mr="4">
                  <InputColor onChange={(event) => setInstagramFontColor(event.target.value)} value={instagramFontColor} label='Instagram' />
                </Box>
                <Box w={['30%', '30%', '20%', '20%']} mr="4">
                  <InputColor onChange={(event) => setWhatsappFontColor(event.target.value)} value={whatsappFontColor} label='Whatsapp' />
                </Box>
                <Box w={['30%', '30%', '20%', '20%']}>
                  <InputColor onChange={(event) => setSiteFontColor(event.target.value)} value={site} label='Site' />
                </Box>
                <SelectInput onChange={(event) => setSocialFontFamily(event.target.value)} value={socialFontFamily} label='Fonte' options={['Ubuntu', 'Koshy', 'Adam']} name="font" />
              </Flex>
            </AccordionComponent>
            <Flex direction="row" w="100%" justifyContent="center">
              <label htmlFor="fileInput">
                <Button as="a" size="md" fontSize="sm" bg="#6b283e" leftIcon={<Icon as={BsFileImageFill} fontSize="20" />} color="#FFF" _hover={{ bgGradient: 'linear(to-r, #6b283e, #90556b)', color: '#FFF' }} cursor="pointer">
                  Adicionar imagem
                </Button>
              </label>
              <Input
                type="file"
                id="fileInput"
                ref={fileInputRef}
                opacity={0}
                position="absolute"
                zIndex="-1"
                pointerEvents="none"
                onChange={handleAddImage}
              />
            </Flex>

            <SimpleGrid columns={[2, 2, 3]} spacing={10} p="4" mt="4">
              <Button
                onClick={addWine}
                mb="2"
                bg={'#6b283e'}
                color={'#FFF'}
                _hover={{
                  bgGradient: 'linear(to-r, #6b283e, #90556b)',
                  color: '#FFF',
                }}
                leftIcon={
                  <Icon as={BsFillPlusCircleFill} fontSize="20" color={'#FFF'} bg={'#6b283e'} />
                }
              >
                Adicionar vinho
              </Button>
              <Button 
                onClick={editWine} 
                mb="2" 
                width="100%" 
                bg={'#6b283e'}
                color={'#FFF'}
                _hover={{
                  bgGradient: 'linear(to-r, #6b283e, #90556b)',
                  color: '#FFF',
                }}
                leftIcon={
                  <Icon as={BsArrowUpCircleFill} fontSize="20" color={'#FFF'} bg={'#6b283e'} />
                }
              >
                Atualizar vinho
              </Button>
              <Button
                onClick={removeLastWine}
                mb="2"
                bg={'#6b283e'}
                color={'#FFF'}
                _hover={{
                  bgGradient: 'linear(to-r, #6b283e, #90556b)',
                  color: '#FFF',
                }}
                leftIcon={
                  <Icon as={BsFillXCircleFill} fontSize="20" color={'#FFF'} bg={'#6b283e'} />
                }
              >
                Remover vinho
              </Button>
            </SimpleGrid>
            <PDFLink document={MyDocument} fileName="wine.pdf">
              <Button
                mb="2"
                width="100%"
                bg={'#3E1E24'}
                color={'#BB975E'}
                _hover={{
                  bg: '#BB975E',
                  color: '#3E1E24',
                }}

              >
                Baixar PDF
              </Button>
            </PDFLink>
          </Box>
          <Flex direction="row" w="100%" justifyContent="center">
            {/* <Box
              w="210mm"
              h="212mm"
              bg="white"
              boxShadow="0 0 1mm rgba(0, 0, 0, 0.2)"
              p="1cm"
              overflow="hidden"
            >
              <Draggable onDrag={handleDragPosition}>
                <div>{title}</div>
              </Draggable>
              {wines.map((wine, index) => (
                <div key={index}>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Draggable onDrag={handleDragWineName}>
                        <div>{wine.name}</div>
                      </Draggable>
                      <Draggable onDrag={handleDragWineVolume}>
                        <div>{wine.volume}</div>
                      </Draggable>
                      <Draggable onDrag={handleDragWineType}>
                        <div>{wine.type}</div>
                      </Draggable>
                    </div>
                  </div>
                </div>
              ))}
              <Resizable onResize={handleResize} width={imageDimensions.width} height={imageDimensions.height}>
                <div>
                  <ChakraImage src={image} alt="wine" style={styles.image} />
                </div>
              </Resizable>
            </Box> */}
            <PDFView />
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

// const handleDragWineContainer = (e: any, ui: any) => {
//   const { x, y } = wineContainerPosition;
//   setWineContainerPosition({ x: x + ui.deltaX, y: y + ui.deltaY });
// }

// const handleDragPosition = (e: any, ui: any) => {
//   const { x, y } = position;
//   setPosition({ x: x + ui.deltaX, y: y + ui.deltaY });
// }

// const handleDragWineName = (e: any, ui: any) => {
//   const { x, y } = wineNamePosition;
//   setWineNamePosition({ x: x + ui.deltaX, y: y + ui.deltaY });
// }

// const handleDragWineVolume = (e: any, ui: any) => {
//   const { x, y } = wineVolumePosition;
//   setWineVolumePosition({ x: x + ui.deltaX, y: y + ui.deltaY });
// }

// const handleDragWineType = (e: any, ui: any) => {
//   const { x, y } = wineTypePosition;
//   setWineTypePosition({ x: x + ui.deltaX, y: y + ui.deltaY });
// }

