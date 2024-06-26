import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../app/api/services/firebase.js';
import { useMemo, useState } from 'react';
import { FaArrowLeftLong, FaFloppyDisk } from "react-icons/fa6";
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import ImageTool from '@editorjs/image';


export default function Editor(props) {
    const [typeTest, setTypeTest] = useState(''); // ['Integracion', 'Unidad', 'Aceptacion', 'Sistema']
    const { projectName, handleNewPrueba } = props;

    const editor = useMemo(() => {
        return new EditorJS({
            holder: 'editorjs',
            tools: {
                header: {
                    class: Header,
                    inlineToolbar: ['link']
                },
                list: {
                    class: List,
                    inlineToolbar: [
                        'link',
                        'bold',
                        'italic',
                    ]
                },
                embed: {
                    class: Embed,
                    config: {
                        services: {
                            youtube: true,
                            coub: true
                        }
                    }
                },

                image: {
                    class: ImageTool,
                    config: {
                        uploader: {
                            uploadByFile(file) {
                                return new Promise((resolve, reject) => {
                                    // Referencia al storage
                                    const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
                                    // Subir el archivo
                                    const uploadTask = uploadBytesResumable(storageRef, file);

                                    uploadTask.on('state_changed',
                                        (snapshot) => {
                                            // Observa los cambios en el estado de la subida, como el progreso, la pausa y la reanudación
                                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                            console.log('Upload is ' + progress + '% done');
                                            switch (snapshot.state) {
                                                case 'paused':
                                                    console.log('Upload is paused');
                                                    break;
                                                case 'running':
                                                    console.log('Upload is running');
                                                    break;
                                            }
                                        },
                                        (error) => {
                                            // Maneja los errores de subida
                                            console.error("Error al subir la imagen a Firebase Storage:", error);
                                            reject(error);
                                        },
                                        () => {
                                            // Subida completada exitosamente
                                            // Obtén la URL de descarga del archivo
                                            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                                resolve({ success: 1, file: { url: downloadURL } });
                                            });
                                        }
                                    );
                                });
                            }
                        }
                    }
                }
            },



            autofocus: true
        });
    }, []);

    const handleTypeTest = (type) => {
        setTypeTest(type);
    }

    return (
        <div className='flex flex-col gap-2 w-[70%] h-full  p-10 text-lg mt-[-80px]'>
            <div className='py-1'>
                <div className="flex w-full justify-between py-1">
                    <FaArrowLeftLong onClick={handleNewPrueba} className='cursor-pointer text-2xl hover:text-primary text-foreground ' />
                    <FaFloppyDisk className='text-xl cursor-pointer text-foreground hover:text-primary' onClick={
                        editor ? async () => {
                            const data = await editor.save();
                            console.log(data);
                        } : null
                    } />
                </div>
                
            </div>
            <span className='text-6xl font-bold'>{projectName}</span>
            <span className='font-bold'>Tipo de prueba:</span>
            <div>
                <ul className='flex gap-2'>
                    <li onClick={() => { handleTypeTest('unidad') }} className={`cursor-pointer ${typeTest === 'unidad' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'} border border-gray-700 px-2 py-1 rounded-sm hover:bg-primary hover:text-white`}>Unidad</li>
                    <li onClick={() => { handleTypeTest('integracion') }} className={`cursor-pointer ${typeTest === 'integracion' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'} border border-gray-700 px-2 py-1 rounded-sm hover:bg-primary hover:text-white`}>Integracion</li>
                    <li onClick={() => { handleTypeTest('sistema') }} className={`cursor-pointer ${typeTest === 'sistema' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'} border border-gray-700 px-2 py-1 rounded-sm hover:bg-primary hover:text-white`}>Sistema</li>
                    <li onClick={() => { handleTypeTest('aceptacion') }} className={`cursor-pointer ${typeTest === 'aceptacion' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'} border border-gray-700 px-2 py-1 rounded-sm hover:bg-primary hover:text-white`}>Aceptación</li>
                    <li onClick={() => { handleTypeTest('rendimiento') }} className={`cursor-pointer ${typeTest === 'rendimiento' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'} border border-gray-700 px-2 py-1 rounded-sm hover:bg-primary hover:text-white`}>Rendimiento</li>
                    <li onClick={() => { handleTypeTest('seguridad') }} className={`cursor-pointer ${typeTest === 'seguridad' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'} border border-gray-700 px-2 py-1 rounded-sm hover:bg-primary hover:text-white`}>Seguridad</li>
                </ul>
            </div>
            <p className='text-base'>Proporcione la información necesaria como soporte ante este informe. <a href="#" className="text-primary decoration-slice font-bold">GUIA</a></p>
            
            <div id='editorjs' className='bg-editor text-foreground rounded-md relative flex flex-col flex-1 align-top  overflow-y-auto mt-4 border border-dashed'>

            </div>

        </div>
    );
}
