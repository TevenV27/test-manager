import React, { useState } from 'react';
import { ScrollArea, Button , Tooltip} from '@radix-ui/themes'
import { FaAngleDown, FaAngleUp, FaExpand } from "react-icons/fa6";
import { FaFileLines } from "react-icons/fa6";


export default function PanelTest(props) {
  const { projectData } = props;
  const [togglePrueba, setTogglePrueba] = useState(false);
  const [indexPrueba, setIndexPrueba] = useState(null);

  const handlePrueba = (index) => {
    setTogglePrueba(!togglePrueba);
    setIndexPrueba(index);
  };


  return (
    <section id='test-panel' className='flex flex-1 flex-col pt-40 pb-20  items-center w-full h-screen relative overflow-y-auto '>

      {!projectData && (
        <picture className='w-full h-full flex justify-center items-center'>
          <source srcSet="/logo.png" type="image/png" />
          <img className='w-[650px] opacity-10' src="/logo.png" alt="logo" />
        </picture>
      )}

      {projectData && (

        <Tooltip size={'3'} content="Generar Informe">
          <button size={'4'} onClick={()=> print()} color='ruby' className='absolute flex justify-center items-center rounded-lg right-2 bottom-2 cursor-pointer bg-[#e44465] hover:bg-[#d2395a] shadow-md text-white w-[90px] h-[110px]'> <span className='text-6xl'>< FaFileLines /></span></button>

        </Tooltip>

      )}

      {projectData && (
        <>
          <span className='absolute left-5 top-5'>{projectData.nombre}</span>
          <div className='flex flex-col gap-10 w-[70%]'>
            <div className='flex flex-col border-b border-1 border-gray-500 pb-2'>
              <h1 className='font-bold text-6xl pb-5'>{projectData.nombre}</h1>
              <span><strong>Creado por: </strong>{projectData.creadoPor}</span>
              <span><strong>Fecha: </strong>{projectData.fechaCreado} - {projectData.horaCreado} </span>
              <span><strong>Desarrollador encargado: </strong>{projectData.desarrolladorEncargado}</span>
            </div>
            <div className='flex flex-col gap-2'>
              <div className='flex justify-end'>
                <Button variant="solid" size={'3'} color='ruby' className='w-72'>Agregar Prueba</Button>
              </div>

              {projectData.pruebas.map((prueba, index) => (
                <div className='flex flex-col'>
                  <div key={index} onClick={() => handlePrueba(index)} className={`flex items-center gap-3 pl-3 ${indexPrueba === index && togglePrueba ? 'bg-[#e64566] text-white' : 'bg-slate-100 '} p-2 rounded-md cursor-pointer hover:bg-[#e44465] hover:text-white`}>
                    {
                      indexPrueba === index && togglePrueba ? <FaAngleUp /> : <FaAngleDown />
                    }
                    <span>{prueba.tipoPrueba}</span>
                  </div>
                  {togglePrueba && indexPrueba === index && (
                    <ScrollArea size="1"
                      type="always"
                      scrollbars="vertical"
                      style={{ height: 500 }}
                      className='flex flex-col p-5 border-l border-r border-b border-1 border-gray-300 relative'>
                      <div className='flex flex-col'>
                        <span><strong>Prueba realizada por: </strong>{prueba.pruebaRealizadaPor}</span>
                        <span><strong>Fecha: </strong>{prueba.fecha}</span>
                        <span><strong>Hora: </strong>{prueba.hora}</span>

                      </div>

                      <div className='flex flex-col pt-5'>
                        <div className='flex flex-col'>
                          <strong>Resumen:</strong>
                          <span>{prueba.resumen}</span>
                        </div>
                        <div className='flex flex-col pt-2'>
                          <strong>Resultados Exitosos:</strong>
                          <span>{prueba.resultadosExitosos}</span>
                        </div>
                        <div className='flex flex-col pt-2'>
                          <strong>Resultados Fallidos:</strong>
                          <span>{prueba.resultadosFallidos}</span>
                        </div>
                        <div className='flex flex-col pt-2'>
                          <strong>Evidencias:</strong>
                          <span>{prueba.resumen}</span>
                        </div>
                      </div>

                      <span className='absolute bottom-5 right-5 text-red-400 cursor-pointer'><FaExpand /></span>

                    </ScrollArea>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

    </section>
  );
}
