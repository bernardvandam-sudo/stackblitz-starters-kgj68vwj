'use client';
import { useEffect } from 'react';
export default function LanguageAttribute(){useEffect(()=>{document.documentElement.lang=window.location.pathname.startsWith('/en')?'en':'nl';},[]);return null;}
