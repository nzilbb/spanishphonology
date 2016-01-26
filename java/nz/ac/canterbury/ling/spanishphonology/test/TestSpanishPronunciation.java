//
// Copyright 2016 New Zealand Institute of Language, Brain and Behaviour, 
// University of Canterbury
// Written by Robert Fromont - robert.fromont@canterbury.ac.nz
//
//    This file is part of spanishphonology.
//
//    spanishphonology is free software; you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation; either version 2 of the License, or
//    (at your option) any later version.
//
//    spanishphonology is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with spanishphonology; if not, write to the Free Software
//    Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
//

package nz.ac.canterbury.ling.spanishphonology.test;
	      
import org.junit.*;
import static org.junit.Assert.*;

import nz.ac.canterbury.ling.spanishphonology.SpanishPronunciation;

public class TestSpanishPronunciation
{
   @Test public void TestBasicTranscriptions() 
   {
      SpanishPronunciation es = new SpanishPronunciation();

      // should be the same for all locales
      for (String locale : es.getSupportedLocales())
      {
	 assertEquals(locale, es.transcribe("año", locale), "aɲo");
	 assertEquals(locale, es.transcribe("ama", locale), "ama");
	 assertEquals(locale, es.transcribe("te", locale), "te");
	 assertEquals(locale, es.transcribe("qué", locale), "ke");
	 assertEquals(locale, es.transcribe("mi", locale), "mi");
	 assertEquals(locale, es.transcribe("mí", locale), "mi");
	 assertEquals(locale, es.transcribe("púm", locale), "pum");
	 assertEquals(locale, es.transcribe("jaja", locale), "xaxa");
	 assertEquals(locale, es.transcribe("ká", locale), "ka");
	 assertEquals(locale, es.transcribe("totó", locale), "toto");
	 assertEquals(locale, es.transcribe("wat", locale), "wat");
      }
   }

   @Test public void TestBasicContextDependentPhonemes() 
   {
      SpanishPronunciation es = new SpanishPronunciation();

      // should be the same for all locales
      for (String locale : es.getSupportedLocales())
      {
	 assertEquals(locale, es.transcribe("baño", locale), "baɲo");
	 assertEquals(locale, es.transcribe("abajo", locale), "aβaxo");

	 assertEquals(locale, es.transcribe("vaso", locale), "baso");
	 assertEquals(locale, es.transcribe("oveja", locale), "oβexa");

	 assertEquals(locale, es.transcribe("harto", locale), "aɾto");
	 assertEquals(locale, es.transcribe("charla", locale), "ʧaɾla");
	 assertEquals(locale, es.transcribe("carla", locale), "kaɾla");

	 assertEquals(locale, es.transcribe("dedo", locale), "deðo");
	 assertEquals(locale, es.transcribe("onda", locale), "onda");
	 assertEquals(locale, es.transcribe("peldaño", locale), "peldaɲo");

	 assertEquals(locale, es.transcribe("agua", locale), "aɣwa");
	 assertEquals(locale, es.transcribe("gil", locale), "xil");
	 assertEquals(locale, es.transcribe("gesto", locale), "xesto");
	 assertEquals(locale, es.transcribe("grande", locale), "gɾande");
	 assertEquals(locale, es.transcribe("colgar", locale), "kolgaɾ");
	 assertEquals(locale, es.transcribe("tango", locale), "taŋgo");

	 assertEquals(locale, es.transcribe("tanto", locale), "tanto");
	 assertEquals(locale, es.transcribe("Danbo", locale), "dambo");
	 assertEquals(locale, es.transcribe("nínfa", locale), "nimfa");
	 assertEquals(locale, es.transcribe("conmemorar", locale), "kommemoɾaɾ"); // TODO doubles
	 assertEquals(locale, es.transcribe("np", locale), "mp"); // TODO can't think of a word
	 assertEquals(locale, es.transcribe("convenir", locale), "kombeniɾ");
	 assertEquals(locale, es.transcribe("Inca", locale), "iŋka");
	 assertEquals(locale, es.transcribe("tanque", locale), "taŋke");
	 assertEquals(locale, es.transcribe("tanqúe", locale), "taŋkue"); // TODO not a real word
	 assertEquals(locale, es.transcribe("canje", locale), "kaŋxe");
	 assertEquals(locale, es.transcribe("rancho", locale), "raɲʧo");
	 assertEquals(locale, es.transcribe("conllevar", locale), "koɲʎeβaɾ");
	 assertEquals(locale, es.transcribe("nhi", locale), "ɲi"); // TODO can't think of a word
	 assertEquals(locale, es.transcribe("conyugal", locale), "koɲʝuɣal");

	 if (locale.equals("es_ES"))
	 {
	    assertEquals(locale, es.transcribe("hacia", locale), "aθja");
	    assertEquals(locale, es.transcribe("Jacinta", locale), "xaθinta");
	 }
	 else
	 {
	    assertEquals(locale, es.transcribe("hacia", locale), "asja");
	    assertEquals(locale, es.transcribe("Jacinta", locale), "xasinta");
	 }

	 assertEquals(locale, es.transcribe("ala", locale), "ala");
	 assertEquals(locale, es.transcribe("allá", locale), "aʎa");

	 assertEquals(locale, es.transcribe("rollo", locale), "roʎo");
	 assertEquals(locale, es.transcribe("pero", locale), "peɾo");
	 assertEquals(locale, es.transcribe("perro", locale), "pero");
	 assertEquals(locale, es.transcribe("enredo", locale), "enreðo");
	 assertEquals(locale, es.transcribe("alrededor", locale), "alreðeðoɾ");
	 if (locale.equals("es_ES"))
	 {
	    assertEquals(locale, es.transcribe("desregulación", locale), "desreɣulaθjon");
	 }
	 else
	 {
	    assertEquals(locale, es.transcribe("desregulación", locale), "desreɣulasjon");
	 }

	 assertEquals(locale, es.transcribe("ese", locale), "ese");
	 assertEquals(locale, es.transcribe("eslabón", locale), "ezlaβon");
	 assertEquals(locale, es.transcribe("esmalte", locale), "ezmalte");
	 assertEquals(locale, es.transcribe("esnob", locale), "eznoβ");
	 assertEquals(locale, es.transcribe("esbelto", locale), "ezβelto");
	 assertEquals(locale, es.transcribe("esdrújulo", locale), "ezðɾuxulo");
	 assertEquals(locale, es.transcribe("resguardar", locale), "rezɣwaɾðaɾ");

	 assertEquals(locale, es.transcribe("guiño", locale), "giɲo");
	 assertEquals(locale, es.transcribe("guerra", locale), "gera");
	 assertEquals(locale, es.transcribe("quiso", locale), "kiso");
	 assertEquals(locale, es.transcribe("guacha", locale), "gwaʧa");
	 assertEquals(locale, es.transcribe("puerro", locale), "pwero");
	 assertEquals(locale, es.transcribe("fui", locale), "fwi");
	 if (locale.equals("es_ES"))
	 {
	    assertEquals(locale, es.transcribe("duodécimo", locale), "dwoðeθimo");
	 }
	 else
	 {
	    assertEquals(locale, es.transcribe("duodécimo", locale), "dwoðesimo");
	 }

	 if (locale.equals("es_ES"))
	 {
	    assertEquals(locale, es.transcribe("vergüenza", locale), "beɾɣwenθa");
	 }
	 else
	 {
	    assertEquals(locale, es.transcribe("vergüenza", locale), "beɾɣwensa");
	 }

	 assertEquals(locale, es.transcribe("éxito", locale), "eksito");
	 assertEquals(locale, es.transcribe("México", locale), "mexiko");
	 assertEquals(locale, es.transcribe("mexicano", locale), "mexikano");
      }
   }

   @Test public void TestBasicLocaleDifferences() 
   {
      SpanishPronunciation es = new SpanishPronunciation();

      assertEquals(es.transcribe("cerveza", "es_MX"), "seɾβesa");
      assertEquals(es.transcribe("cerveza", "es_ES"), "θeɾβeθa");

   }

   @Test public void TestUnknownCharacters() 
   {
      SpanishPronunciation es = new SpanishPronunciation();

      for (String locale : es.getSupportedLocales())
      {
	 assertEquals(locale, es.transcribe("te amo", locale), "teamo");
	 assertEquals(locale, es.transcribe("4", locale), "kwatɾo");
	 assertEquals(locale, es.transcribe("41", locale), "kwaɾentaiuno");
	 assertEquals(locale, es.transcribe("2016", locale), "");
      }
   }
   
   public static void main(String args[]) 
   {
      org.junit.runner.JUnitCore.main("nz.ac.canterbury.ling.spanishphonology.test.TestSpanishPronunciation");
   }
}
