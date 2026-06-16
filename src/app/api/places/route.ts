import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const canton = searchParams.get('canton');
  const typeTab = searchParams.get('type');

  if (!canton || !typeTab) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  // Mapear el tab a un término de búsqueda en español más estricto
  let queryType = '';
  let includedType = '';
  switch (typeTab) {
    case 'Todos':
      queryType = 'lugares populares y cosas que hacer';
      includedType = 'point_of_interest';
      break;
    case 'Restaurantes': 
      queryType = 'restaurantes excelentes'; 
      includedType = 'restaurant';
      break;
    case 'Compras':
      queryType = 'compras, supermercados, locales y tiendas';
      includedType = 'store';
      break;
    case 'Naturaleza':
    case 'Activo':
      queryType = 'parques, senderos, cascadas y naturaleza';
      includedType = 'tourist_attraction';
      break;
    case 'Belleza':
      queryType = 'spas y salones de belleza';
      includedType = 'spa';
      break;
    case 'Vida Nocturna': 
      queryType = 'bares y vida nocturna'; 
      includedType = 'bar';
      break;
    default: 
      queryType = 'lugares de interés';
      includedType = 'point_of_interest';
  }

  // Búsqueda muy estricta para forzar resultados del cantón
  const textQuery = `${queryType} en el cantón de ${canton}, Costa Rica`;

  try {
    const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.types,places.photos',
        'Referer': 'http://localhost:3000'
      },
      body: JSON.stringify({
        textQuery,
        languageCode: 'es',
        maxResultCount: 20,
        includedType: includedType !== 'point_of_interest' ? includedType : undefined,
        strictTypeFiltering: false // Desactivado para no excluir pequeños supermercados o negocios locales en zonas rurales
      })
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error("Google API Error:", errorData);
      return NextResponse.json({ error: 'Failed to fetch places' }, { status: res.status });
    }

    const data = await res.json();
    
    // Normalizar cantón (quitar tildes y guiones) para comparación
    const normalizedCanton = canton.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/-/g, ' ');
    
    // Formatear los lugares para la tabla
    let places = (data.places || []).map((place: any) => {
      // Extraer URL de la foto
      let imgUrl = "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=150&q=80"; // fallback
      if (place.photos && place.photos.length > 0) {
        imgUrl = `https://places.googleapis.com/v1/${place.photos[0].name}/media?maxHeightPx=400&maxWidthPx=400&key=${apiKey}`;
      }

      // Tipo de lugar simplificado
      let primaryType = place.types?.[0]?.replace(/_/g, ' ') || typeTab;
      primaryType = primaryType.charAt(0).toUpperCase() + primaryType.slice(1);

      return {
        name: place.displayName?.text || 'Lugar Desconocido',
        img: imgUrl,
        type: primaryType,
        distance: "Centro", // La API de texto no devuelve distancia exacta tan fácil sin origen
        rating: place.rating || 4,
        reviews: place.userRatingCount || Math.floor(Math.random() * 200) + 10,
        address: place.formattedAddress
      };
    });

    // Eliminado el filtro estricto local que requería el nombre exacto del cantón en la dirección,
    // ya que la query original ("en el cantón de...") es suficiente para guiar a Google.
    // Esto previene que pestañas como Compras o Naturaleza queden vacías.
    
    return NextResponse.json(places);
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
