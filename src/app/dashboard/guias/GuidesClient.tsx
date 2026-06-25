"use client";

import { useState } from 'react';
import { Save, Plus, Trash2, GripVertical } from 'lucide-react';
import ImageUpload from "@/components/admin/ImageUpload";

interface GuideStep {
  num: string;
  title: string;
  desc: string;
  img: string;
}

const DEFAULT_BUYER_STEPS: GuideStep[] = [
    {
      num: "1",
      title: "INVESTIGUE",
      desc: "¿Ya sabe dónde quiere comprar? ¿Si quiere un condominio, una casa adosada o una casa unifamiliar? ¿Qué características le gustan y cuáles no? ¿Qué hay disponible en el mercado ahora? Si respondió que no a alguna de estas preguntas, ahora es el momento de comenzar a investigar. Además de buscar casas que le interesen, tome nota de cualquier cambio en los precios de venta. Esto podría brindarle información valiosa sobre las tendencias de vivienda en vecindarios específicos y ayudarlo cuando llegue el momento de hacer una oferta.",
      img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80"
    },
    {
      num: "2",
      title: "DECIDA SU PRESUPUESTO",
      desc: "Observe que dije que decida su presupuesto, no determine cuánto le dará la compañía hipotecaria. En muchos casos, una compañía hipotecaria lo preaprobará por más de lo que se siente cómodo gastando, por lo que debe determinar el pago mensual con el que se siente cómodo antes de hablar con un prestamista. Esto probablemente incluye hacer un presupuesto completo del hogar y tener en cuenta qué cambios además del pago de una hipoteca ocurrirán una vez que se mude a su nuevo hogar. Si ha vivido en un apartamento o con compañeros de cuarto, es posible que pase por alto nuevos gastos como basura, agua o tarifas de HOA que podrían arruinar fácilmente su presupuesto.",
      img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80"
    },
    {
      num: "3",
      title: "OBTENGA UNA PRECALIFICACIÓN",
      desc: "El hecho de que crea que puede pagar un cierto pago cada mes no significa que la compañía hipotecaria esté de acuerdo. Así como pueden aprobarlo por una cantidad demasiado grande, también pueden aprobarlo por una cantidad menor o negarle una hipoteca por completo. La falta de tiempo en un trabajo, crédito insuficiente, quiebras pasadas u otros problemas financieros pueden causar problemas importantes al tratar de asegurar una hipoteca. Antes de fijarse en una casa, hable con un profesional hipotecario para averiguar para qué cantidad puede calificar. Esto también será una ventaja cuando haga una oferta por una casa, ya que algunos vendedores no considerarán las ofertas de aquellos que no están precalificados para un préstamo.",
      img: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=1200&q=80"
    },
    {
      num: "4",
      title: "ELIJA UN AGENTE INMOBILIARIO",
      desc: "¿Puede buscar, ver y, en última instancia, hacer una oferta por una casa sin un agente inmobiliario? Técnicamente sí, pero ¿por qué lo haría cuando no le cuesta nada a un agente como yo quitarle gran parte del estrés de los hombros? No solo lo ayudaré a identificar propiedades en las que podría estar interesado, organizar visitas y, en última instancia, manejar el proceso de oferta, sino que también tengo un conocimiento del mercado que usted no posee. Es posible que pueda alejarlo de ciertas casas o vecindarios, sugerir gemas ocultas o darle consejos que lo ayudarán a encontrar la casa de sus sueños por el precio correcto. Mi objetivo es brindarle el servicio más personalizado diseñado para ayudarlo a comprar la casa de sus sueños.",
      img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80"
    },
    {
      num: "5",
      title: "ENCUENTRE LA CASA ADECUADA",
      desc: "Este debería ser el paso más agradable de todo el proceso (¡además de mudarse!). Organizaré exhibiciones de las casas que le interesan y que se ajusten a su presupuesto. Tome notas sobre lo que le gusta y lo que no, y asegúrese de prestar atención a los detalles. Encienda y apague los interruptores de luz, abra y cierre las puertas y deje correr los grifos en varias habitaciones. No limite su inspección a la casa en sí. Asegúrese de tomarse el tiempo para explorar el vecindario y estar atento al tráfico en ciertos momentos del día, la situación del estacionamiento y lo cerca que está de las necesidades como escuelas y supermercados.",
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    },
    {
      num: "6",
      title: "HAGA UNA OFERTA",
      desc: "Una vez que haya seleccionado la casa perfecta, trabaje con su agente para elaborar una oferta justa basada en el valor de viviendas comparables en el mercado. Dependiendo del precio de venta de la casa y de si el entorno actual es un mercado de compradores o vendedores, su oferta puede estar por debajo, al mismo nivel o incluso por encima del precio de venta. Podré ayudarlo a negociar si recibe una contraoferta y llega a un acuerdo. En este punto, la casa entrará en plica (escrow).",
      img: "https://images.unsplash.com/photo-1556156653-e5a7c69cc263?auto=format&fit=crop&w=1200&q=80"
    },
    {
      num: "7",
      title: "HAGA INSPECCIONAR LA CASA",
      desc: "En la mayoría de los casos, su oferta estará condicionada a la inspección de la casa para asegurarse de que no haya daños estructurales importantes ni grandes reparaciones necesarias. Puedo ayudarlo a organizarlo y puede programarlo a los pocos días de hacer una oferta. Si no hay problemas importantes, el proceso pasa al paso ocho. Si los hay, puede renegociar su oferta en función de lo que deba arreglarse, o puede retirarla.",
      img: "https://images.unsplash.com/photo-1504307651254-35680f356fce?auto=format&fit=crop&w=1200&q=80"
    },
    {
      num: "8",
      title: "SELECCIONE SU PRÉSTAMO",
      desc: "Ahora es el momento de volver al prestamista hipotecario que lo preaprobó o precalificó y elegir su hipoteca. Se le presentarán varias opciones en función de su situación financiera única, incluidas tasas fijas, tasas variables, a 15 años, a 30 años o programas especiales. Trabaje con su prestamista hipotecario para seleccionar la opción con la que se sienta más cómodo.",
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"
    },
    {
      num: "9",
      title: "OBTENGA UNA TASACIÓN",
      desc: "Su prestamista hará que tasen su nueva casa para tener su valor independiente de ella. La tasación es para asegurar que todas las partes involucradas están pagando un precio justo por la casa.",
      img: "https://images.unsplash.com/photo-1460472178825-e5240623afd5?auto=format&fit=crop&w=1200&q=80"
    },
    {
      num: "10",
      title: "TERMINE EL PAPELEO",
      desc: "Nadie espera con ansias todo el papeleo involucrado en la compra de una casa, pero es una parte necesaria del proceso. Afortunadamente, todo será organizado por su prestamista y la compañía de títulos y, cuando haya terminado, sabrá que es el propietario legal de su nuevo hogar.",
      img: "https://images.unsplash.com/photo-1571216656722-1d6ebfa77da1?auto=format&fit=crop&w=1200&q=80"
    }
];

const DEFAULT_SELLER_STEPS: GuideStep[] = [
    {
      num: "1",
      title: "ENTIENDA POR QUÉ ESTÁ VENDIENDO",
      desc: "¿Qué desea lograr con la venta de su casa? ¿Desea ganar una cierta cantidad de dinero que pueda destinar a una casa más grande o mejor? ¿Necesita venderla lo antes posible para facilitar una mudanza a una nueva ciudad o área? Una vez que entienda sus necesidades, podrá elaborar mejor su oferta. Por ejemplo, si necesita vender rápidamente, es posible que desee ponerle un precio a su casa más bajo que si su objetivo es obtener un cierto margen de beneficio. Asegúrese de comunicar estas necesidades a su Agente Inmobiliario® una vez que elija uno para que él o ella pueda ajustar su precio de venta en consecuencia.",
      img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80"
    },
    {
      num: "2",
      title: "DETERMINE EL PRECIO DE VENTA",
      desc: "Saber cómo fijar el precio de su casa es una de las partes más importantes del proceso de venta. Cuando establece un precio justo al principio, obtendrá el mayor interés de otros agentes inmobiliarios y posibles compradores. Ponerle un precio excesivo a su casa podría provocar una reducción del interés, y fijarle un precio inferior al valor real hará que reciba menos de lo que vale su casa. Trabajar con un agente inmobiliario es la mejor manera de determinar el precio de venta correcto para su casa. Un agente con experiencia puede determinar a cuánto se están vendiendo otras casas comparables, evaluar el mercado actual e incluso puede sugerir una tasación de la casa.",
      img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1200&q=80"
    },
    {
      num: "3",
      title: "COMIENCE LAS PREPARACIONES",
      desc: "Si ha mantenido su casa en condiciones de exhibición desde que vive en ella, se encuentra en la minoría de los propietarios. Una vez que fije el precio de su casa, es hora de comenzar a prepararla para mostrarla a los posibles compradores. Esto incluye deshacerse del desorden, despersonalizar el espacio para que los compradores puedan imaginarse a sí mismos en él, hacer pequeñas reparaciones y hacer una limpieza profunda para asegurarse de que su casa esté en perfectas condiciones.",
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    },
    {
      num: "4",
      title: "DESARROLLE UNA ESTRATEGIA DE MARKETING",
      desc: "Desarrollaré una estrategia de marketing perfecta para anunciar su casa. Esto implica listar la casa y luego dirigir a las personas adecuadas a ese listado a través de campañas en las redes sociales, referencias de agente a agente, medios tradicionales o publicidad SEO. Mi equipo crea una campaña de marketing que tiene como objetivo obtener la mayor cantidad de tráfico posible a su listado en las primeras tres semanas después de convertirse en cliente.",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80"
    },
    {
      num: "5",
      title: "EVALÚE LAS OFERTAS",
      desc: "Recibir una oferta es una parte emocionante del proceso, pero no significa que el viaje haya terminado. Evaluaremos cada oferta y nos aseguraremos de que la parte que hace la oferta esté precalificada o preaprobada por un prestamista hipotecario y que su oferta sea aceptable para usted. Si la oferta es demasiado baja, puede hacer una contraoferta u ofrecer otras formas de cerrar la brecha, como cubrir algunos o todos los costos de cierre, hacer reparaciones, ajustar la fecha de mudanza o dejar algunos electrodomésticos o accesorios para el nuevo comprador.",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    },
    {
      num: "6",
      title: "ACEPTE UNA OFERTA",
      desc: "Una vez que consideremos que la oferta es aceptable, revisaremos el contrato propuesto para asegurarnos de que todo esté en orden e incluya los componentes necesarios, como el monto del depósito, el pago inicial, el financiamiento, los derechos de inspección y las asignaciones de reparación, las contingencias, la fecha de liquidación y una lista de tarifas y quién las pagará. Cuando ambas partes hayan acordado el término, su agente preparará un contrato final.",
      img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
    },
    {
      num: "7",
      title: "PREPÁRESE PARA EL CIERRE",
      desc: "Ha aceptado una oferta y ahora está muy cerca del final de su viaje de venta. Pero primero, usted y el comprador deben hacer una lista de lo que debe hacerse antes del cierre. En algunos casos, su casa puede necesitar ser inspeccionada formalmente, encuestada y tasada. En otros casos, será necesario realizar reparaciones importantes o menores antes de que se pueda cerrar la casa. Encabezaré los esfuerzos para desarrollar y ejecutar esta lista, hacer que la parte correcta pague por cada elemento de acción y asegurarme de que todo esté en orden para la fecha de cierre. Unos días antes de la fecha de cierre, llamaremos a la empresa que cierra la transacción para asegurarnos de que todo esté listo para comenzar.",
      img: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=1200&q=80"
    },
    {
      num: "8",
      title: "CIERRE",
      desc: "Ha llegado al último paso en el proceso del vendedor. Cuando cierra en una casa que está vendiendo, transfiere legalmente la propiedad al nuevo comprador. Nos reuniremos con la empresa que cierra la transacción para firmar el papeleo final y revisar cualquier problema que aún no se haya resuelto. Durante este tiempo, también puede hacer planes con su Agente Inmobiliario® para manejar detalles finales, como cancelar los servicios, cambiar el nombre en las cuentas que el nuevo propietario retendrá y asegurarse de que el nuevo propietario tenga instrucciones para los electrodomésticos.",
      img: "https://images.unsplash.com/photo-1571216656722-1d6ebfa77da1?auto=format&fit=crop&w=1200&q=80"
    }
];

export default function GuidesClient({
  initialBuyerGuide,
  initialSellerGuide
}: {
  initialBuyerGuide: GuideStep[] | null,
  initialSellerGuide: GuideStep[] | null
}) {
  const [activeTab, setActiveTab] = useState<'buyer' | 'seller'>('buyer');
  const [buyerGuide, setBuyerGuide] = useState<GuideStep[]>(initialBuyerGuide || DEFAULT_BUYER_STEPS);
  const [sellerGuide, setSellerGuide] = useState<GuideStep[]>(initialSellerGuide || DEFAULT_SELLER_STEPS);
  const [isSaving, setIsSaving] = useState(false);

  const currentGuide = activeTab === 'buyer' ? buyerGuide : sellerGuide;
  const setCurrentGuide = activeTab === 'buyer' ? setBuyerGuide : setSellerGuide;

  const handleUpdateStep = (index: number, field: keyof GuideStep, value: string) => {
    const updated = [...currentGuide];
    updated[index] = { ...updated[index], [field]: value };
    setCurrentGuide(updated);
  };

  const handleRemoveStep = (index: number) => {
    const updated = [...currentGuide];
    updated.splice(index, 1);
    setCurrentGuide(updated);
  };

  const handleAddStep = () => {
    const updated = [...currentGuide];
    updated.push({
      num: (updated.length + 1).toString(),
      title: "NUEVO PASO",
      desc: "Descripción del nuevo paso...",
      img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80"
    });
    setCurrentGuide(updated);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteSettings: {
            buyerGuide,
            sellerGuide
          }
        }),
      });

      if (!response.ok) throw new Error("Error al guardar");
      alert("Guías guardadas correctamente");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al guardar las guías");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-900 p-6 md:p-8 rounded-lg shadow-sm border border-gray-100 dark:border-neutral-800">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex gap-2 bg-gray-100 dark:bg-neutral-800 p-1 rounded-md">
          <button
            onClick={() => setActiveTab('buyer')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'buyer' ? 'bg-white dark:bg-neutral-700 shadow-sm text-black dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
            }`}
          >
            Guía del Comprador
          </button>
          <button
            onClick={() => setActiveTab('seller')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'seller' ? 'bg-white dark:bg-neutral-700 shadow-sm text-black dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
            }`}
          >
            Guía del Vendedor
          </button>
        </div>
        
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isSaving ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>

      <div className="space-y-6">
        {currentGuide.map((step, idx) => (
          <div key={idx} className="bg-gray-50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 p-6 rounded-md relative flex gap-4">
            <div className="flex flex-col items-center gap-4 mt-2">
              <div className="w-8 h-8 bg-gray-200 dark:bg-neutral-800 rounded-full flex items-center justify-center font-bold text-gray-500 dark:text-gray-400">
                {idx + 1}
              </div>
              <button 
                onClick={() => handleRemoveStep(idx)}
                className="text-red-400 hover:text-red-600 transition-colors"
                title="Eliminar paso"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Número de Paso</label>
                  <input
                    type="text"
                    value={step.num}
                    onChange={(e) => handleUpdateStep(idx, 'num', e.target.value)}
                    className="w-full bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 rounded-md p-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white text-black dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Título</label>
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => handleUpdateStep(idx, 'title', e.target.value)}
                    className="w-full bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 rounded-md p-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white text-black dark:text-white"
                  />
                </div>
                <div>
                  <ImageUpload 
                    label="Imagen del Paso"
                    value={step.img}
                    onChange={(url) => handleUpdateStep(idx, 'img', url as string)}
                  />
                </div>
              </div>
              
              <div className="flex flex-col h-full">
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Descripción</label>
                <textarea
                  value={step.desc}
                  onChange={(e) => handleUpdateStep(idx, 'desc', e.target.value)}
                  className="w-full flex-1 bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 rounded-md p-3 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white text-black dark:text-white resize-y"
                  rows={6}
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={handleAddStep}
          className="w-full py-4 border-2 border-dashed border-gray-300 dark:border-neutral-700 rounded-md text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-colors flex items-center justify-center gap-2 font-medium"
        >
          <Plus className="w-5 h-5" />
          Añadir Nuevo Paso
        </button>
      </div>
    </div>
  );
}
