import Head from 'next/head';
import { useState } from 'react';
import ReactMapboxGl, {
  Layer,
  Featur,
  Marker,
  Cluster,
  Popup,
} from 'react-mapbox-gl';
import { Flex, Box, Text, Image, Link } from 'rebass';
import 'mapbox-gl/dist/mapbox-gl.css';

import styles from '../styles/Home.module.css';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiYW5kcmVzc3MyMiIsImEiOiJjazhnODZnNmowYnRrM21xbzlzYjAyZDVnIn0.wS1s6fEZoLF9-KHsxQFCKQ',
});

const animals = [
  {
    geometry: {
      coordinates: [-75.7668, 5.16549],
    },
    data: {
      name: 'Oso de anteojos',
      scienceName: 'Tremarctos ornatus',
      description:
        'También es conocido como oso andino porque habita los bosques andinos localizados a más de 2.000 m.s.n.m. Es el único oso de Suramérica (Venezuela, Ecuador, Perú, Bolivia y Colombia) y en el país se estima una población cercana a los 8.000 individuos. Se alimenta en gran medida de frutas silvestres, rizomas, bulbos y bromelias, aunque también llega a consumir carcasas de animales muertos. Sus características manchas alrededor de los ojos, hocico y pecho son distintas en cada individuo. Al igual que el panda y el oso malayo, no hiberna. Es un excelente trepador y sus garras les sirven para agarrar y manipular ramas de árboles, tallos de plantas o cavar en la tierra. Aunque son omnívoros, consumen principalmente frutas y plantas. Por su dieta y sus largos recorridos, ayudan a diseminar las semillas de las plantas que consume. En Colombia se encuentra en 22 de los 59 Parques Nacionales Naturales.',
      moreInfo:
        'https://wwflac.awsassets.panda.org/downloads/plan_de_conservacion_para_el_oso_de_anteojos_y_la_danta_de_montana_en_el_departamento_de.pdf',
      category: 'Vulnerable',
      image: 'https://wwflac.awsassets.panda.org/img/original/publi_oso.jpg',
    },
  },
  {
    geometry: {
      coordinates: [-74.523056, 3.567222],
    },
    data: {
      name: 'Jaguar',
      scienceName: 'Panthera onca',
      description:
        'Es el felino más grande del continente americano. Su población en el mundo se ha reducido en un 45% y en países como Estados Unidos, El Salvador y Uruguay está declarado como extinto. En Colombia, las poblaciones más grandes de jaguares se encuentran en el Amazonas, la Orinoquia, Chocó y el Caribe. Esta especie necesita grandes extensiones de tierra para sobrevivir, por eso la pérdida del hábitat, el desarrollo de infraestructura, la expansión de las actividades agrícolas y ganaderas, y la pérdida de vegetación son sus grandes amenazas.',
      moreInfo:
        'https://www.wwf.org.co/sala_redaccion/noticias/?uNewsID=363712',
      category: 'Vulnerable',
      image: 'https://wwflac.awsassets.panda.org/img/original/jaguar_face.jpg',
    },
  },
  {
    geometry: {
      coordinates: [-77.35, 5.98333],
    },
    data: {
      name: 'Tortugas carey',
      scienceName: 'Eretmochelys imbricata',
      description:
        'La contaminación, la utilización de su caparazón para la fabricación de artesanías, el consumo de huevos y la destrucción de su hábitat son sus mayores amenazas. Su presencia en los océanos es un indicador de la salud de los ecosistemas. (Ver infografía).',
      moreInfo: null,
      category: 'Peligro crítico',
      image:
        'https://wwflac.awsassets.panda.org/img/original/medium_ww184614.jpg',
    },
  },
  {
    geometry: {
      coordinates: [-74.717, 8.817],
    },
    data: {
      name: 'Tití cabeciblanco',
      scienceName: 'Saguinus oedipus',
      description:
        'Fue declarada amenazada en 1973 y desde ese momento el comercio ilegal ha aumentado sus condiciones de amenaza. En Colombia se encuentra entre el río Atrato y el río Magdalena, en los departamentos de Atlántico, Bolívar, Sucre, Córdoba, y el Nordeste Antioqueño. La destrucción de su hábitat es el principal peligro en el país para esta especie que puede producir más de 40 vocalizaciones para comunicarse con sus familias.',
      moreInfo: null,
      category: 'Peligro crítico',
      image:
        'https://wwflac.awsassets.panda.org/img/original/small_ww187755.jpg',
    },
  },
  {
    geometry: {
      coordinates: [-72.90722, 11.54444],
    },
    data: {
      name: 'Manatí del Caribe',
      scienceName: 'Trichechus manatus',
      description:
        'Se encuentra en las costas del Caribe, desde el sureste de los Estados Unidos, México, el océano Atlántico en las Antillas y en las costas del norte de Sur América. En Colombia, está en el Caribe, la cuenca del Orinoco y parte del río Magdalena: desde Puerto Berrío, Antioquia hasta Bocas de Ceniza y el Canal del Dique. Una de sus principales amenazas es la cacería por parte de pescadores. Existe un programa nacional para el manejo de los manatíes colombianos (2004) que pronto será actualizado. Disponible aquí.',
      moreInfo: null,
      category: 'Peligro',
      image:
        'https://wwflac.awsassets.panda.org/img/original/wwfca_manaties.jpg',
    },
  },
  {
    geometry: {
      coordinates: [-73.6676, 10.8323],
    },
    data: {
      name: 'Águila solitaria',
      scienceName: 'Buteogallus solitarius',
      description:
        'Se encuentra en la Vertiente de la Sierra Nevada de Santa Marta, en la Serranía de Perijá, Cordillera Occidental en Cauca y en la Cordillera Oriental en el oeste de Caquetá (hasta 2.200 m.). También está en el noroeste de México, en el norte de Venezuela, en Bolivia y en el noroeste de Argentina. Se alimenta principalmente de serpientes, aves y pequeños mamíferos. La cacería, destrucción y fragmentación de su hábitat son sus mayores amenazas. Categoría de amenaza UICN: Casi amenazada (NT) Categoría nacional: En peligro crítico (CR) 8. Paujil piquiazul (Crax alberti) Es una especie endémica del norte de Colombia, presente desde el piedemonte de la Sierra Nevada de Santa Marta hasta la cuenca baja y media del río Magdalena. Está amenazado por la destrucción sistemática y masiva de su hábitat.',
      moreInfo: null,
      category: 'Peligro crítico',
      image: 'https://www.ecured.cu/images/5/5b/Aguila_solitariaa1.jpg',
    },
  },
  {
    geometry: {
      coordinates: [-76.6473, 1.14748],
    },
    data: {
      name: 'Caimán negro',
      scienceName: 'Melanosuchus niger',
      description:
        'Es llamado así por el color oscuro que adquiere su piel en la adultez. Vive en lagos, ríos y otros hábitats de agua dulce, principalmente en la cuenca del Amazonas entre Colombia, Ecuador y Perú. Es el mayor depredador de estos humedales. Gracias a su potente vista y audición, caza durante la noche. La caza ilegal y la pérdida y fragmentación de su hábitat son sus mayores amenazas. Actualmente, WWF y Parques Nacionales Naturales participan en el establecimiento de un corredor trinacional entre el Parque Nacional Natural La Paya (Colombia), la Reserva de Producción de Fauna Cuyabeno (Ecuador) y el Parque Nacional Güeppi-Sekime (Perú), para incrementar las poblaciones de la especie.',
      moreInfo: null,
      category: 'Preocupación Menor',
      image: 'https://i.ytimg.com/vi/vrLqNaIGpRo/hqdefault.jpg',
    },
  },
];

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const onMarkerClick = (coordinates, targetId) => {
    if (selectedIndex) {
      setSelectedIndex(null);
    } else {
      setSelectedIndex(targetId);
    }
  };

  const clusterMarker = (coordinates) => (
    <Marker coordinates={coordinates} style={styles.clusterMarker}>
      <img
        style={{ width: '60px' }}
        src={'https://www.flaticon.es/svg/static/icons/svg/1843/1843825.svg'}
      />
    </Marker>
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header className={styles.header}>
        <audio controls preload='auto'>
          <source src='/junglee.ogg' type='audio/ogg' />
          Your browser does not support the audio element.
        </audio>

        <Text as='h1' sx={{ color: '#0070f3' }}>
          Gestión
        </Text>
      </header>

      <main className={styles.main}>
        <Map
          // onMove={() => setSelectedIndex(null)}
          center={[-75.590553, 6.230833]}
          zoom={[5]}
          style='mapbox://styles/mapbox/streets-v8'
          containerStyle={{
            height: '100vh',
            width: '100vw',
          }}
        >
          {/* <Cluster ClusterMarkerFactory={clusterMarker}> */}
          {animals?.map((animal, key) => {
            return (
              <Marker
                key={key}
                coordinates={animal?.geometry?.coordinates}
                onClick={() => onMarkerClick(animal, key)}
              >
                <img
                  style={{ width: '60px' }}
                  src={
                    'https://www.flaticon.es/svg/static/icons/svg/1843/1843825.svg'
                  }
                />
                {selectedIndex === key && (
                  <Flex
                    flexDirection='column'
                    alignItems='center'
                    sx={{
                      position: 'absolute',
                      zIndex: '999999999999',
                      padding: '1.6rem 2.4rem',
                      borderRadius: '10px',
                    }}
                    backgroundColor='white'
                    width='30vw'
                  >
                    <Text sx={{ marginBottom: '1.6rem' }} as='h1'>
                      {animal?.data?.name}
                    </Text>
                    <Image
                      sx={{
                        marginBottom: '1rem',
                        width: '50%',
                        height: '140px',
                        objectFit: 'cover',
                      }}
                      src={animal?.data?.image}
                      alt='animal image'
                    />
                    <Flex>
                      <span>
                        <b>Nombre científico: </b>
                      </span>
                      <Text
                        sx={{ marginLeft: '0.2rem', marginBottom: '1rem' }}
                        as='p'
                      >
                        {animal?.data?.scienceName}
                      </Text>
                    </Flex>
                    <Text as='p'>{animal?.data?.description}</Text>
                    <Link
                      target='_blank'
                      sx={{ color: '#0070f3', marginBottom: '1rem' }}
                      href={animal?.data?.moreInfo}
                    >
                      Mas info{' '}
                    </Link>
                    <Flex>
                      <span>
                        <b>Categoría: </b>
                      </span>
                      <Text sx={{ marginLeft: '0.2rem' }} as='p'>
                        {animal?.data?.category}
                      </Text>
                    </Flex>
                  </Flex>
                )}
              </Marker>
            );
          })}
          {/* </Cluster> */}
        </Map>
      </main>
    </div>
  );
}
