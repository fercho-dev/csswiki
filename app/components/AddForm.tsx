'use client'

import React, { FC, FormEvent, ChangeEvent, useState } from 'react';
import { filters } from '../data';
import { Filtro } from '../types';

async function postData(url: string) {
  try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
      });

      // Convierte la respuesta en JSON y la retorna
      return await response.json(); 
  } catch (error) {
      // Maneja cualquier error que pueda ocurrir y lo imprime en la consola
      console.error('Error:', error);
      throw error;
  }
}

// Utility function to check if a string is a valid URL
const isValidURL = (str: string): boolean => {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(str);
}

export const CustomForm: FC = () => {
    const [url, setUrl] = useState<string>('');
    const [filtro, setFiltro] = useState<string>('');
    const [customFiltro, setCustomFiltro] = useState<boolean>(false);

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();

        if (!isValidURL(url)) {
            alert('Ups! Parece que la URL no es valida.');
            return;
        }

        postData(`/api/db?url=${url}&filtro=${filtro}`)
          .then(data => {
              if(data.acknowledged) {
                  alert('🎉 ¡Recurso guardado exitosamente! Se validará y se agregará pronto');
                  setUrl('');
                  setFiltro('');
              } else {
                throw new Error('No se pudo guardar el recurso.');
              }
          })
          .catch(error => {
              alert(`Algo salio mal. Intentalo más tarde. ${error}`);
          });
    }

    const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>): void => {
        const value = e.target.value;

        if (value === "custom") {
            setCustomFiltro(true);
        } else {
            setCustomFiltro(false);
            setFiltro(value);
        }
    }

    return (
      <div className='mt-4'>
        <p className='text-lg text-center'>✍🏼 Comparte recursos con la comunidad</p>
        <form className='px-4 py-6 flex flex-col gap-6' onSubmit={handleSubmit}>
            <div>
                <label>
                    URL:
                    <input 
                        type="text" 
                        value={url} 
                        onChange={(e) => setUrl(e.target.value)}
                        className='border border-slate-200 bg-slate-100 rounded mx-4 px-2 outline-none'
                    />
                </label>
            </div>
            <div className='flex flex-col gap-2'>
                <label>
                    Filtro:
                    <select 
                        value={filtro} 
                        onChange={handleFilterChange}
                        className='mx-4 outline-none border border-slate-200 bg-slate-100 rounded p-1'
                    >
                        {filters.map((option: Filtro) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                        <option value="custom">Otro...</option>
                    </select>
                </label>
                {customFiltro && (
                    <input 
                        type="text"
                        value={filtro}
                        placeholder="Agrega un nuevo filtro"
                        onChange={(e) => setFiltro(e.target.value)}
                        className='border border-slate-200 bg-slate-50 rounded px-2 outline-none'
                    />
                )}
            </div>
            <button className='my-4 self-center text-white text-bold px-3 py-1 rounded bg-purple-500 hover:bg-purple-600 transition duration-300 hover:scale-105' type="submit">Enviar</button>
        </form>
      </div>
    );
}
