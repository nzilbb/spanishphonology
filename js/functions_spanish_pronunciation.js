/**
 * spanish-pronunciation-rules-php -
 * a PHP function that converts a Spanish word (UTF-8 encoded) into IPA phonetic transcription symbols.
 * Supported locales: es_ES (Spain), es_MX (Mexico)
 * Written by Timur Baytukalov, http://easypronunciation.com/en/
 * Contact me at: http://easypronunciation.com/en/contacts
 * License: http://www.gnu.org/licenses/gpl.html
 * @version 0.1
 * 
 * Ported to Javascript by robert@fromont.net.nz 2016-01-25
 *
 * Sample usage:
 * var ipa = convert_spanish_word_to_phonetic_transcription ("amigo", "es_ES"); // returns "amiɣo"
 */

// all the letters from the following array are pronounced always the same way by all Spanish speakers:
// (capital letter means that the vowel letter is stressed).
var array_spanish_letters = { "a" : "a", "á" : "A", "e" : "e", "é" : "E", "f" : "f", "h" : "", "í" : "I", "j" : "x", "k" : "k", "m" : "m", "ñ" : "ɲ", "o" : "o", "ó" : "O", "p" : "p", "q" : "k", "t" : "t", "ú" : "U", "w" : "w" };

// localized pronunciation variants:
var array_spanish_letters_localized = { "z" : { "es_ES" : "θ", "es_MX" : "s" } };
var array_spanish_letters_localized_variables = {"c_before_i_or_e" : { "es_ES" : "θ", "es_MX" : "s" } };

// supported locales:
var array_supported_spanish_locales = ["es_ES", "es_MX"];

// regular expression pattern to check if we have a word:
var regex_pattern_is_word = new RegExp("[A-Za-zÀ-ÿ]");

var array_s_becomes_z = ["l", "m", "n", "b", "d", "g"];
var array_v_becomes_b_transcription_signs = ["m", "n", "ɲ"];
var array_a_e_i_o_u = ["a", "e", "i", "o", "u", "á", "é", "í", "ó", "ú"];
var array_i_e_for_c_and_g = ["e", "i", "é", "í"];
var array_a_e_o_u_for_i = ["a", "e", "o", "u", "á", "é", "ó", "ú"];
var array_a_e_o_i_for_u = ["a", "e", "o", "i", "á", "é", "ó", "í"];
var array_a_o_u_for_nc = ["a", "o", "u", "á", "ó", "ú"];
var array_n_becomes_m = ["b", "f", "m", "p", "v"];

function convert_spanish_word_to_phonetic_transcription (word, locale) {
    
	// we return an error, if the locale is not supported:
	if (array_supported_spanish_locales.indexOf(locale) < 0) {
		return false;
	}

	// we return an error, if the word doesn't contain any latin characters:
	if (!word.match(regex_pattern_is_word)) {
		return false;
	}

	// we convert the word to lowercase:
	word = word.toLowerCase();

	// length of the word:
	var length_of_word = word.length;

	// we set the future phonetic transcription
	var phonetic_transcription = "";

	// we set the variable that will allow us to skip some letters, if we want to:
	var skip_next_letter = 0;
	
	for (var current_position=1; current_position < length_of_word+1; current_position++) {

		// we skip the current letter (repeat the cycle the desired number of times):
		if (skip_next_letter > 0) {
			skip_next_letter--;
			continue;
		}

		// we set the previous and the following letters:
		var current_letter = word.charAt(current_position-1);
		var previous_letter = "";
		var next_letter = "";
		var after_next_letter = "";
		if (current_position>1) { previous_letter = word.charAt(current_position-2); }
		if (current_position<length_of_word) { next_letter = word.charAt(current_position); }
		if (current_position<length_of_word-1) { after_next_letter = word.charAt(current_position+1); }

		// we set the last transcription sign
		var last_transcription_sign = phonetic_transcription.charAt(phonetic_transcription.length-1);

		// the letter is pronounced the same way by all Spanish speakers:
		if (array_spanish_letters[current_letter]) {
			phonetic_transcription += array_spanish_letters[current_letter];
			continue;
		}

		// the letter can be pronounced differently by Spanish speakers from different countries:
		if (array_spanish_letters_localized[current_letter]) {
			phonetic_transcription += array_spanish_letters_localized[current_letter][locale];
			continue;
		}

		// letters "b" and "v" are equivalent:
		if ((current_letter == "b") || (current_letter == "v")) {
			// at the beginning of a word
			if ((current_position == 1) ||
				// [mb], [nb], [ɲb]
				(array_v_becomes_b_transcription_signs.indexOf(last_transcription_sign) >= 0)) {
				phonetic_transcription += "b";
			} else {
				phonetic_transcription += "β";
			}
			continue;
		}
	
		if (current_letter == "c") {
			if (array_i_e_for_c_and_g.indexOf(next_letter) >= 0) {
				phonetic_transcription += array_spanish_letters_localized_variables["c_before_i_or_e"][locale];
				continue;
			}
			if (next_letter == "h") {
				phonetic_transcription += "ʧ";
				skip_next_letter = 1;
				continue;
			}
			phonetic_transcription += "k";
			continue;
		}

		if (current_letter == "d") {
			// at the beginning of a word
			if ((current_position == 1) ||
				// [nd]
				(last_transcription_sign == "n") ||
				// [ld]
				(last_transcription_sign == "l")) {
				phonetic_transcription += "d";
			} else {
				phonetic_transcription += "ð";
			}
			continue;
		}
		
		if (current_letter == "g") {
			if (array_i_e_for_c_and_g.indexOf(next_letter) >= 0) {
				phonetic_transcription += "x";
				continue;
			}
			// at the beginning of a word
			if ((current_position == 1) ||
				// "ng"
				(previous_letter == "n") ||
				// "lg"
				(previous_letter == "l")) {
				phonetic_transcription += "g";
				continue;
			}
			phonetic_transcription += "ɣ";
			continue;
		}

		if (current_letter == "i") {
			if (array_a_e_o_u_for_i.indexOf(next_letter) >= 0) {
				phonetic_transcription += "j";
			} else {
				phonetic_transcription += "i";
			}
			continue;
		}

		if (current_letter == "l") {
			// "ll"
			if (next_letter == "l") {
				phonetic_transcription += "ʎ";
				skip_next_letter = 1;
				continue;
			}
			phonetic_transcription += "l";
			continue;
		}

		if (current_letter == "n") {
			if (array_n_becomes_m.indexOf(next_letter) >= 0) {
				phonetic_transcription += "m";
				continue;
			}
			// "nca", "nco", "ncu"
			if (((next_letter == "c") && (array_a_o_u_for_nc.indexOf(after_next_letter) >= 0)) ||
				// "nqu"
				((next_letter == "q") && ((after_next_letter == "u") || (after_next_letter == "ú"))) ||
				// "nk"
				(next_letter == "k") ||
				// "ng"
				(next_letter == "g") ||
				// "nj"
				(next_letter == "j")) {
				phonetic_transcription += "ŋ";
				continue;
			}
			// "nll"
			if (((next_letter == "l") && (after_next_letter == "l")) ||
				// "nch"
				((next_letter == "c") && (after_next_letter == "h")) ||
				// "nhi"
				((next_letter == "h") && ((after_next_letter == "i") || (after_next_letter == "í"))) ||
				// "ny"
				(next_letter == "y")) {
				phonetic_transcription += "ɲ";
				continue;
			}
			phonetic_transcription += "n";
			continue;
		}

		if (current_letter == "r") {
			// at the beginning of a word
			if ((current_position == 1) ||
				// "nr"
				(last_transcription_sign == "n") ||
				// "lr"
				(last_transcription_sign == "l") ||
				// "sr"
				(last_transcription_sign == "s") ||
				// "rr"
				(next_letter == "r")) {
				phonetic_transcription += "r";
				if (next_letter == "r") {
					skip_next_letter = 1;
				}
				continue;
			}
			phonetic_transcription += "ɾ";
			continue;
		}
	
		if (current_letter == "s") {
			if (array_s_becomes_z.indexOf(next_letter) >= 0) {
				phonetic_transcription += "z";
				continue;
			}
			phonetic_transcription += "s";
			continue;
		}

		if (current_letter == "u") {
			// "gui", "gue" - not pronounced
			if (((previous_letter == "g") && (array_i_e_for_c_and_g.indexOf(next_letter) >= 0)) ||
				// "qu" - not pronounced
				(previous_letter == "q")) {
				continue;
			}
			// "ua", "ue", "ui", "uo"
			if (array_a_e_o_i_for_u.indexOf(next_letter) >= 0) {
				phonetic_transcription += "w";
				continue;
			}
			phonetic_transcription += "u";
			continue;
		}

		if (current_letter == "ü") {
			// "üa", "üe", "üo", "üi"
			if (array_a_e_o_i_for_u.indexOf(next_letter) >= 0) {
				phonetic_transcription += "w";
				continue;
			}
			phonetic_transcription += "u";
			continue;
		}

		if (current_letter == "x") {
			// words starting with "méxic", "mexic" are exceptions:
			if ((current_position == 3) && ((word.substr(0, 5) == "méxic") || (word.substr(0, 5) == "mexic"))) {
				phonetic_transcription += "x";
				continue;
			}
			phonetic_transcription += "ks";
			continue;
		}

		if (current_letter == "y") {
			// the next letter is vowel
			if (array_a_e_i_o_u.indexOf(next_letter) >= 0) {
				phonetic_transcription += "ʝ";
				continue;
			}
			// the following is for proper handling of the accent position later:
			if ((length_of_word > 1) && (current_position == length_of_word)) {
				phonetic_transcription += "Y";
			} else {
				phonetic_transcription += "i";
			}
			continue;
		}			

	}

	// the following is to normalize the phonetic transcription to the IPA standard
	// we don't use this when processing the Spanish text
	var array_normalize_transcription_to_ipa = {"A" : "a", "E" : "e", "I" : "i", "O" : "o", "U" : "u", "Y" : "i"};
	for (original in array_normalize_transcription_to_ipa) {
		var pattern = new RegExp(original);
		phonetic_transcription = phonetic_transcription.replace(pattern, array_normalize_transcription_to_ipa[original]);
	}

	return phonetic_transcription;

}
