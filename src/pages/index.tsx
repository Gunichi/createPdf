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
  StyleSheet
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
import { GiWineBottle } from 'react-icons/gi';
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
    lastSectionPageImage: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      width: '20%',
      height: '20%'
    },
    lastSectionPage: {
      justifyContent: 'center',
      alignItems: 'center',
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
    image: {
      width: imageDimensions.width,
      height: imageDimensions.height,
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
      color: titleColor,
      fontSize: '12',
      position: 'absolute',
      marginTop: 10,
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
    },
    whatsapp: {
      fontSize: 12,
      marginTop: 2,
      fontWeight: 'bold',
      fontFamily: wineFontFamily,
      color: whatsappFontColor,
      marginBottom: 2,
    },
    website: {
      fontSize: 12,
      marginTop: 2,
      fontWeight: 'bold',
      fontFamily: wineFontFamily,
      color: siteFontColor,
      marginBottom: 2,
    },
    cardDate: {
      fontSize: 12,
      marginTop: 2,
      fontWeight: 'bold',
      fontFamily: wineFontFamily,
      color: cardDateFontColor,
      marginBottom: 2,
    },
  });

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

  const borderTypes = ['solid', 'dotted', 'dashed'];

  const handleDragWineContainer = (e: any, ui: any) => {
    const { x, y } = wineContainerPosition;
    setWineContainerPosition({ x: x + ui.deltaX, y: y + ui.deltaY });
  }

  const handleDragPosition = (e: any, ui: any) => {
    const { x, y } = position;
    setPosition({ x: x + ui.deltaX, y: y + ui.deltaY });
  }

  const handleDragWineName = (e: any, ui: any) => {
    const { x, y } = wineNamePosition;
    setWineNamePosition({ x: x + ui.deltaX, y: y + ui.deltaY });
  }

  const handleDragWineVolume = (e: any, ui: any) => {
    const { x, y } = wineVolumePosition;
    setWineVolumePosition({ x: x + ui.deltaX, y: y + ui.deltaY });
  }

  const handleDragWineType = (e: any, ui: any) => {
    const { x, y } = wineTypePosition;
    setWineTypePosition({ x: x + ui.deltaX, y: y + ui.deltaY });
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
              <Image style={styles.image} src={wine.image} />
            </View>
          ))}
        </View>
      </Page>
      <Page size="A4" style={styles.firstPage} wrap={false}>
        <View style={styles.lastSectionPage}>
          <Text style={styles.instagram}>Instagram:{instagram}</Text>
          <Text style={styles.whatsapp}>Whatsapp: {whatsapp}</Text>
          <Text style={styles.website}>Site: {site}</Text>
          <Text style={styles.cardDate}>Data: {cardDate}</Text>
        </View>
      </Page>
    </Document>
  )


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
            <label htmlFor="fileInput">
              <Button as="a" size="md" fontSize="sm" bg="#3E1E24" leftIcon={<Icon as={FiUpload} fontSize="20" />} color="#BB975E" _hover={{ bg: '#BB975E', color: '#3E1E24' }}>
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

            <SimpleGrid columns={[2, 2, 3]} spacing={10} p="4" mt="4">
              <Button
                onClick={addWine}
                mb="2"
                bg={'#3E1E24'}
                color={'#BB975E'}
                _hover={{
                  bg: '#BB975E',
                  color: '#3E1E24',
                }}
              >
                Adicionar vinho
              </Button>
              <Button onClick={editWine} mb="2" width="100%" bg={'#3E1E24'} color={'#BB975E'} _hover={{ bg: '#BB975E', color: '#3E1E24' }}>
                Atualizar vinho
              </Button>
              <Button
                onClick={removeLastWine}
                mb="2"
                bg={'#3E1E24'}
                color={'#BB975E'}
                _hover={{
                  bg: '#BB975E',
                  color: '#3E1E24',
                }}
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
