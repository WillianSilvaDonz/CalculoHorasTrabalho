import React, { useState, useEffect } from 'react';
import './App.css';
import Cleave from 'cleave.js/react';
import hmh from 'hmh';

export default function App() {

    const [quantidade, setQuantidade] = useState('');
    const [entrada, setEntrada] = useState('');
    const [saidameiodia, setSaidaMeioDia] = useState('');
    const [voltameiodia, setVoltaMeioDia] = useState('');
    const [saida, setSaida] = useState('');
    const [diferenca, setDiferenca] = useState('');

    useEffect(()=>{
        setQuantidade('08:00:00');
    }, []);

    useEffect(()=>{
        if(saidameiodia.length >= 5){
            var Aentrada = entrada.split(":");
            var Asaidameiodia = saidameiodia.split(":");
            var Aquantidade = quantidade.split(":");
            var dif = hmh.diff(`${Aentrada[0]}h ${Aentrada[1]}m`, `${Asaidameiodia[0]}h ${Asaidameiodia[1]}m`);
            var difmostra = hmh.diff(`${dif.h}h ${dif.m}m`, `${Aquantidade[0]}h ${Aquantidade[1]}m`);
            setDiferenca(`${difmostra.h}:${difmostra.m}`);
        }
    }, [saidameiodia]);

    useEffect(()=>{
        if(voltameiodia.length >= 5){
            var Avoltameiodia = voltameiodia.split(":");
            var Adiferenca = diferenca.split(":");

            var sumData = hmh.sum(`${Avoltameiodia[0]}h ${Avoltameiodia[1]}m ${Adiferenca[0]}h ${Adiferenca[1]}m`);

            setSaida(`${sumData.h}:${sumData.m ? sumData.m : "00" }`);
        }
    }, [voltameiodia]);

    function returnDate(texto){
        return new Date(texto.slice(0,4), texto.slice(4,6),texto.slice(6,8), texto.slice(9,11), texto.slice(12,14));
    }

    function diffData(date1, date2){
        var diffMs = (date2 - date1);
        var diffHrs = Math.floor((diffMs % 86400000) / 3600000);
        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
        return ("00"+diffHrs).slice(-2) + ':' + diffMins;
    }

    return (
        <div className="container">
            <div className="cardCalculo">
                <h2>Calculo de Horas</h2>
                <form>
                    <Cleave options={{ time: true, timePattern: ['h', 'm'] }} className="campo" value={quantidade} onChange={ e => setQuantidade(e.target.value) } placeholder="Quantas Horas você trabalha?"  />
                    <Cleave options={{ time: true, timePattern: ['h', 'm'] }} className="campo" value={entrada} onChange={ e => setEntrada(e.target.value) } placeholder="Que horas você Entrou?" />
                    <Cleave options={{ time: true, timePattern: ['h', 'm'] }} className="campo" value={saidameiodia} onChange={ e => setSaidaMeioDia(e.target.value) } placeholder="Que Horas foi para o almoço?" name="saidameiodia" />
                    <Cleave options={{ time: true, timePattern: ['h', 'm'] }} className="campo" value={voltameiodia} onChange={ e => setVoltaMeioDia(e.target.value) } placeholder="Que horas você volto do Meio dia?" name="voltameiodia" />
                    <Cleave options={{ time: true, timePattern: ['h', 'm'] }} className="campo" value={saida} onChange={ e=> setSaida(e.target.value) } placeholder="Que horas você vai sai?" name="saida" />
                    <button className="botaoCalcular" >Calcular</button>
                    {diferenca}
                </form>
            </div>
        </div>
    );
}
