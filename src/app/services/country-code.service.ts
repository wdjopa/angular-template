import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CountryCodeService {

  constructor() { }
  countryList = [
    {
      "name": "Afghanistan",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Afghanistan.svg",
      "dial_code": "+93"
    },
    {
      "name": "Albania",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/3/36/Flag_of_Albania.svg",
      "dial_code": "+355"
    },
    {
      "name": "Algeria",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/7/77/Flag_of_Algeria.svg",
      "dial_code": "+213"
    },
    {
      "name": "Andorra",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Andorra.svg",
      "dial_code": "+376"
    },
    {
      "name": "Angola",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Angola.svg",
      "dial_code": "+244"
    },
    {
      "name": "Anguilla",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Anguilla.svg",
      "dial_code": "+1 264"
    },
    {
      "name": "Antigua and Barbuda",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/8/89/Flag_of_Antigua_and_Barbuda.svg",
      "dial_code": "+1268"
    },
    {
      "name": "Argentina",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg",
      "dial_code": "+54"
    },
    {
      "name": "Armenia",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_Armenia.svg",
      "dial_code": "+374"
    },
    {
      "name": "Aruba",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/f/f6/Flag_of_Aruba.svg",
      "dial_code": "+297"
    },
    {
      "name": "Australia",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg",
      "dial_code": "+61"
    },
    {
      "name": "Austria",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_Austria.svg",
      "dial_code": "+43"
    },
    {
      "name": "Azerbaijan",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/d/dd/Flag_of_Azerbaijan.svg",
      "dial_code": "+994"
    },
    {
      "name": "Bahamas",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/9/93/Flag_of_the_Bahamas.svg",
      "dial_code": "+1 242"
    },
    {
      "name": "Bahrain",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Bahrain.svg",
      "dial_code": "+973"
    },
    {
      "name": "Bangladesh",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/f/f9/Flag_of_Bangladesh.svg",
      "dial_code": "+880"
    },
    {
      "name": "Barbados",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/e/ef/Flag_of_Barbados.svg",
      "dial_code": "+1 246"
    },
    {
      "name": "Belarus",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/8/85/Flag_of_Belarus.svg",
      "dial_code": "+375"
    },
    {
      "name": "Belgium",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Belgium.svg",
      "dial_code": "+32"
    },
    {
      "name": "Belize",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/e/e7/Flag_of_Belize.svg",
      "dial_code": "+501"
    },
    {
      "name": "Benin",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/0/0a/Flag_of_Benin.svg",
      "dial_code": "+229"
    },
    {
      "name": "Bermuda",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/b/bf/Flag_of_Bermuda.svg",
      "dial_code": "+1 441"
    },
    {
      "name": "Bhutan",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/9/91/Flag_of_Bhutan.svg",
      "dial_code": "+975"
    },
    {
      "name": "Bosnia and Herzegovina",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/b/bf/Flag_of_Bosnia_and_Herzegovina.svg",
      "dial_code": "+387"
    },
    {
      "name": "Botswana",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_Botswana.svg",
      "dial_code": "+267"
    },
    {
      "name": "Bouvet Island",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Norway.svg",
      "dial_code": "+55"
    },
    {
      "name": "Brazil",
      "flag": "https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg",
      "dial_code": "+55"
    },
    {
      "name": "British Indian Ocean Territory",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Flag_of_the_British_Indian_Ocean_Territory.svg",
      "dial_code": "+246"
    },
    {
      "name": "Brunei Darussalam",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/9/9c/Flag_of_Brunei.svg",
      "dial_code": "+673"
    },
    {
      "name": "Bulgaria",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Bulgaria.svg",
      "dial_code": "+359"
    },
    {
      "name": "Burkina Faso",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/3/31/Flag_of_Burkina_Faso.svg",
      "dial_code": "+226"
    },
    {
      "name": "Burundi",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/5/50/Flag_of_Burundi.svg",
      "dial_code": "+257"
    },
    {
      "name": "Cambodia",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_Cambodia.svg",
      "dial_code": "+855"
    },
    {
      "name": "Cameroon",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/4/4f/Flag_of_Cameroon.svg",
      "dial_code": "+237"
    },
    {
      "name": "Canada",
      "flag": "https://upload.wikimedia.org/wikipedia/en/c/cf/Flag_of_Canada.svg",
      "dial_code": "+1"
    },
    {
      "name": "Cape Verde",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/3/38/Flag_of_Cape_Verde.svg",
      "dial_code": "+238"
    },
    {
      "name": "Cayman Islands",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/0/0f/Flag_of_the_Cayman_Islands.svg",
      "dial_code": "+1345"
    },
    {
      "name": "Central African Republic",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/6/6f/Flag_of_the_Central_African_Republic.svg",
      "dial_code": "+236"
    },
    {
      "name": "Chad",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Flag_of_Chad.svg",
      "dial_code": "+235"
    },
    {
      "name": "Chile",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/7/78/Flag_of_Chile.svg",
      "dial_code": "+56"
    },
    {
      "name": "China",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg",
      "dial_code": "+86"
    },
    {
      "name": "Christmas Island",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/6/67/Flag_of_Christmas_Island.svg",
      "dial_code": "+61"
    },
    {
      "name": "Cocos (Keeling) Islands",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/7/74/Flag_of_the_Cocos_%28Keeling%29_Islands.svg",
      "dial_code": "+61"
    },
    {
      "name": "Colombia",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Colombia.svg",
      "dial_code": "+57"
    },
    {
      "name": "Comoros",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/9/94/Flag_of_the_Comoros.svg",
      "dial_code": "+269"
    },
    {
      "name": "Congo",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/9/92/Flag_of_the_Republic_of_the_Congo.svg",
      "dial_code": "+242"
    },
    {
      "name": "Cook Islands",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/3/35/Flag_of_the_Cook_Islands.svg",
      "dial_code": "+682"
    },
    {
      "name": "Costa Rica",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Costa_Rica_%28state%29.svg",
      "dial_code": "+506"
    },
    {
      "name": "Croatia",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/1/1b/Flag_of_Croatia.svg",
      "dial_code": "+385"
    },
    {
      "name": "Cuba",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/b/bd/Flag_of_Cuba.svg",
      "dial_code": "+53"
    },
    {
      "name": "Cyprus",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Cyprus.svg",
      "dial_code": "+357"
    },
    {
      "name": "Czech Republic",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_Czech_Republic.svg",
      "dial_code": "+420"
    },
    {
      "name": "Denmark",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/9/9c/Flag_of_Denmark.svg",
      "dial_code": "+45"
    },
    {
      "name": "Djibouti",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/3/34/Flag_of_Djibouti.svg",
      "dial_code": "+253"
    },
    {
      "name": "Dominica",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/c/c4/Flag_of_Dominica.svg",
      "dial_code": "+1 767"
    },
    {
      "name": "Dominican Republic",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_the_Dominican_Republic.svg",
      "dial_code": "+1 849"
    },
    {
      "name": "Ecuador",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/e/e8/Flag_of_Ecuador.svg",
      "dial_code": "+593"
    },
    {
      "name": "Egypt",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Egypt.svg",
      "dial_code": "+20"
    },
    {
      "name": "El Salvador",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/3/34/Flag_of_El_Salvador.svg",
      "dial_code": "+503"
    },
    {
      "name": "Equatorial Guinea",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/3/31/Flag_of_Equatorial_Guinea.svg",
      "dial_code": "+240"
    },
    {
      "name": "Eritrea",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/2/29/Flag_of_Eritrea.svg",
      "dial_code": "+291"
    },
    {
      "name": "Estonia",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/8/8f/Flag_of_Estonia.svg",
      "dial_code": "+372"
    },
    {
      "name": "Ethiopia",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/7/71/Flag_of_Ethiopia.svg",
      "dial_code": "+251"
    },
    {
      "name": "Falkland Islands (Malvinas)",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_Falkland_Islands.svg",
      "dial_code": "+500"
    },
    {
      "name": "Faroe Islands",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/3/3c/Flag_of_the_Faroe_Islands.svg",
      "dial_code": "+298"
    },
    {
      "name": "Fiji",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Fiji.svg",
      "dial_code": "+679"
    },
    {
      "name": "Finland",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Finland.svg",
      "dial_code": "+358"
    },
    {
      "name": "France",
      "flag": "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
      "dial_code": "+33"
    },
    {
      "name": "French Guiana",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/2/29/Flag_of_French_Guiana.svg",
      "dial_code": "+594"
    },
    {
      "name": "French Polynesia",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/d/db/Flag_of_French_Polynesia.svg",
      "dial_code": "+689"
    },
    {
      "name": "Gabon",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/0/04/Flag_of_Gabon.svg",
      "dial_code": "+241"
    },
    {
      "name": "Gambia",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/7/77/Flag_of_The_Gambia.svg",
      "dial_code": "+220"
    },
    {
      "name": "Georgia",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/0/0f/Flag_of_Georgia.svg",
      "dial_code": "+995"
    },
    {
      "name": "Germany",
      "flag": "https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg",
      "dial_code": "+49"
    },
    {
      "name": "Ghana",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Ghana.svg",
      "dial_code": "+233"
    },
    {
      "name": "Gibraltar",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/0/02/Flag_of_Gibraltar.svg",
      "dial_code": "+350"
    },
    {
      "name": "Greece",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Greece.svg",
      "dial_code": "+30"
    },
    {
      "name": "Greenland",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_Greenland.svg",
      "dial_code": "+299"
    },
    {
      "name": "Grenada",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Grenada.svg",
      "dial_code": "+1 473"
    },
    {
      "name": "Guadeloupe",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/0/04/Flag_of_Guadeloupe_%28local%29.svg",
      "dial_code": "+590"
    },
    {
      "name": "Guam",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/0/07/Flag_of_Guam.svg",
      "dial_code": "+1 671"
    },
    {
      "name": "Guatemala",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/e/ec/Flag_of_Guatemala.svg",
      "dial_code": "+502"
    },
    {
      "name": "Guernsey",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_Guernsey.svg",
      "dial_code": "+44"
    },
    {
      "name": "Guinea",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/e/ed/Flag_of_Guinea.svg",
      "dial_code": "+224"
    },
    {
      "name": "Guinea-Bissau",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_Guinea-Bissau.svg",
      "dial_code": "+245"
    },
    {
      "name": "Guyana",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/9/99/Flag_of_Guyana.svg",
      "dial_code": "+592"
    },
    {
      "name": "Haiti",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/5/56/Flag_of_Haiti.svg",
      "dial_code": "+509"
    },
    {
      "name": "Heard Island and McDonald Islands",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_Antarctica.svg",
      "dial_code": "+672"
    },
    {
      "name": "Holy See (Vatican City State)",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/0/00/Flag_of_the_Vatican_City.svg",
      "dial_code": "+379"
    },
    {
      "name": "Honduras",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/8/82/Flag_of_Honduras.svg",
      "dial_code": "+504"
    },
    {
      "name": "Hong Kong",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/5/5b/Flag_of_Hong_Kong.svg",
      "dial_code": "+852"
    },
    {
      "name": "Hungary",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/c/c1/Flag_of_Hungary.svg",
      "dial_code": "+36"
    },
    {
      "name": "Iceland",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/c/ce/Flag_of_Iceland.svg",
      "dial_code": "+354"
    },
    {
      "name": "India",
      "flag": "https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg",
      "dial_code": "+91"
    },
    {
      "name": "Indonesia",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg",
      "dial_code": "+62"
    },
    {
      "name": "Iran",
      "flag": " https://upload.wikimedia.org/wikipedia/commons/c/ca/Flag_of_Iran.svg",
      "dial_code": "+98"
    },
    {
      "name": "Iraq",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/f/f6/Flag_of_Iraq.svg",
      "dial_code": "+964"
    },
    {
      "name": "Ireland",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/4/45/Flag_of_Ireland.svg",
      "dial_code": "+353"
    },
    {
      "name": "Isle of Man",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_the_Isle_of_Man.svg",
      "dial_code": "+44"
    },
    {
      "name": "Israel",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Israel.svg",
      "dial_code": "+972"
    },
    {
      "name": "Italy",
      "flag": "https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg",
      "dial_code": "+39"
    },
    {
      "name": "Jamaica",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/0/0a/Flag_of_Jamaica.svg",
      "dial_code": "+1 876"
    },
    {
      "name": "Japan",
      "flag": "https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg",
      "dial_code": "+81"
    },
    {
      "name": "Jersey",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/1/1c/Flag_of_Jersey.svg",
      "dial_code": "+44"
    },
    {
      "name": "Jordan",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/c/c0/Flag_of_Jordan.svg",
      "dial_code": "+962"
    },
    {
      "name": "Kazakhstan",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/d/d3/Flag_of_Kazakhstan.svg",
      "dial_code": "+7"
    },
    {
      "name": "Kenya",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Kenya.svg",
      "dial_code": "+254"
    },
    {
      "name": "Kiribati",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/d/d3/Flag_of_Kiribati.svg",
      "dial_code": "+686"
    },
    {
      "name": "Kuwait",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/a/aa/Flag_of_Kuwait.svg",
      "dial_code": "+965"
    },
    {
      "name": "Kyrgyzstan",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/c/c7/Flag_of_Kyrgyzstan.svg",
      "dial_code": "+996"
    },
    {
      "name": "Lao People's Democratic Republic",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/5/56/Flag_of_Laos.svg",
      "dial_code": "+856"
    },
    {
      "name": "Latvia",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/8/84/Flag_of_Latvia.svg",
      "dial_code": "+371"
    },
    {
      "name": "Lebanon",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/5/59/Flag_of_Lebanon.svg",
      "dial_code": "+961"
    },
    {
      "name": "Lesotho",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/4/4a/Flag_of_Lesotho.svg",
      "dial_code": "+266"
    },
    {
      "name": "Liberia",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/b/b8/Flag_of_Liberia.svg",
      "dial_code": "+231"
    },
    {
      "name": "Liechtenstein",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/4/47/Flag_of_Liechtenstein.svg",
      "dial_code": "+423"
    },
    {
      "name": "Lithuania",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/1/11/Flag_of_Lithuania.svg",
      "dial_code": "+370"
    },
    {
      "name": "Luxembourg",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/d/da/Flag_of_Luxembourg.svg",
      "dial_code": "+352"
    },
    {
      "name": "Macao",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/6/63/Flag_of_Macau.svg",
      "dial_code": "+853"
    },
    {
      "name": "Madagascar",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Madagascar.svg",
      "dial_code": "+261"
    },
    {
      "name": "Malawi",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/d/d1/Flag_of_Malawi.svg",
      "dial_code": "+265"
    },
    {
      "name": "Malaysia",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/6/66/Flag_of_Malaysia.svg",
      "dial_code": "+60"
    },
    {
      "name": "Maldives",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/0/0f/Flag_of_Maldives.svg",
      "dial_code": "+960"
    },
    {
      "name": "Mali",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/9/92/Flag_of_Mali.svg",
      "dial_code": "+223"
    },
    {
      "name": "Malta",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/7/73/Flag_of_Malta.svg",
      "dial_code": "+356"
    },
    {
      "name": "Marshall Islands",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/2/2e/Flag_of_the_Marshall_Islands.svg",
      "dial_code": "+692"
    },
    {
      "name": "Martinique",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/5/52/Flag_of_Martinique.svg",
      "dial_code": "+596"
    },
    {
      "name": "Mauritania",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/4/43/Flag_of_Mauritania.svg",
      "dial_code": "+222"
    },
    {
      "name": "Mauritius",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/7/77/Flag_of_Mauritius.svg",
      "dial_code": "+230"
    },
    {
      "name": "Mayotte",
      "flag": "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
      "dial_code": "+262"
    },
    {
      "name": "Mexico",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg",
      "dial_code": "+52"
    },
    {
      "name": "Monaco",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/e/ea/Flag_of_Monaco.svg",
      "dial_code": "+377"
    },
    {
      "name": "Mongolia",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_Mongolia.svg",
      "dial_code": "+976"
    },
    {
      "name": "Montenegro",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Montenegro.svg",
      "dial_code": "+382"
    },
    {
      "name": "Montserrat",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/d/d0/Flag_of_Montserrat.svg",
      "dial_code": "+1664"
    },
    {
      "name": "Morocco",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg",
      "dial_code": "+212"
    },
    {
      "name": "Mozambique",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/d/d0/Flag_of_Mozambique.svg",
      "dial_code": "+258"
    },
    {
      "name": "Myanmar",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/8/8c/Flag_of_Myanmar.svg",
      "dial_code": "+95"
    },
    {
      "name": "Namibia",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/0/00/Flag_of_Namibia.svg",
      "dial_code": "+264"
    },
    {
      "name": "Nauru",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/3/30/Flag_of_Nauru.svg",
      "dial_code": "+674"
    },
    {
      "name": "Nepal",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/9/9b/Flag_of_Nepal.svg",
      "dial_code": "+977"
    },
    {
      "name": "Netherlands",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg",
      "dial_code": "+31"
    },
    {
      "name": "New Caledonia",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/2/23/Flag_of_New_Caledonia.svg",
      "dial_code": "+687"
    },
    {
      "name": "New Zealand",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg",
      "dial_code": "+64"
    },
    {
      "name": "Nicaragua",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Nicaragua.svg",
      "dial_code": "+505"
    },
    {
      "name": "Niger",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/f/f4/Flag_of_Niger.svg",
      "dial_code": "+227"
    },
    {
      "name": "Nigeria",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_Nigeria.svg",
      "dial_code": "+234"
    },
    {
      "name": "Niue",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_Niue.svg",
      "dial_code": "+683"
    },
    {
      "name": "Norfolk Island",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Norfolk_Island.svg",
      "dial_code": "+672"
    },
    {
      "name": "Northern Mariana Islands",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Flag_of_the_Northern_Mariana_Islands.svg",
      "dial_code": "+1 670"
    },
    {
      "name": "Norway",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Norway.svg",
      "dial_code": "+47"
    },
    {
      "name": "Oman",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/d/dd/Flag_of_Oman.svg",
      "dial_code": "+968"
    },
    {
      "name": "Pakistan",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/3/32/Flag_of_Pakistan.svg",
      "dial_code": "+92"
    },
    {
      "name": "Palau",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Palau.svg",
      "dial_code": "+680"
    },
    {
      "name": "Panama",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/a/ab/Flag_of_Panama.svg",
      "dial_code": "+507"
    },
    {
      "name": "Papua New Guinea",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/e/e3/Flag_of_Papua_New_Guinea.svg",
      "dial_code": "+675"
    },
    {
      "name": "Paraguay",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/2/27/Flag_of_Paraguay.svg",
      "dial_code": "+595"
    },
    {
      "name": "Peru",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Peru.svg",
      "dial_code": "+51"
    },
    {
      "name": "Philippines",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/9/99/Flag_of_the_Philippines.svg",
      "dial_code": "+63"
    },
    {
      "name": "Pitcairn",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_the_Pitcairn_Islands.svg",
      "dial_code": "+870"
    },
    {
      "name": "Poland",
      "flag": "https://upload.wikimedia.org/wikipedia/en/1/12/Flag_of_Poland.svg",
      "dial_code": "+48"
    },
    {
      "name": "Portugal",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg",
      "dial_code": "+351"
    },
    {
      "name": "Puerto Rico",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/2/28/Flag_of_Puerto_Rico.svg",
      "dial_code": "+1 939"
    },
    {
      "name": "Qatar",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Qatar.svg",
      "dial_code": "+974"
    },
    {
      "name": "Réunion",
      "flag": "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
      "dial_code": "+262"
    },
    {
      "name": "Romania",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/7/73/Flag_of_Romania.svg",
      "dial_code": "+40"
    },
    {
      "name": "Rwanda",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/1/17/Flag_of_Rwanda.svg",
      "dial_code": "+250"
    },
    {
      "name": "Saint Kitts and Nevis",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Saint_Kitts_and_Nevis.svg",
      "dial_code": "+1 869"
    },
    {
      "name": "Saint Lucia",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Saint_Lucia.svg",
      "dial_code": "+1 758"
    },
    {
      "name": "Saint Pierre and Miquelon",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/7/74/Flag_of_Saint-Pierre_and_Miquelon.svg",
      "dial_code": "+508"
    },
    {
      "name": "Saint Vincent and the Grenadines",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/6/6d/Flag_of_Saint_Vincent_and_the_Grenadines.svg",
      "dial_code": "+1 784"
    },
    {
      "name": "Samoa",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/3/31/Flag_of_Samoa.svg",
      "dial_code": "+685"
    },
    {
      "name": "San Marino",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/b/b1/Flag_of_San_Marino.svg",
      "dial_code": "+378"
    },
    {
      "name": "Sao Tome and Principe",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/4/4f/Flag_of_Sao_Tome_and_Principe.svg",
      "dial_code": "+239"
    },
    {
      "name": "Saudi Arabia",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg",
      "dial_code": "+966"
    },
    {
      "name": "Senegal",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/f/fd/Flag_of_Senegal.svg",
      "dial_code": "+221"
    },
    {
      "name": "Serbia",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/f/ff/Flag_of_Serbia.svg",
      "dial_code": "+381"
    },
    {
      "name": "Seychelles",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Seychelles.svg",
      "dial_code": "+248"
    },
    {
      "name": "Sierra Leone",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/1/17/Flag_of_Sierra_Leone.svg",
      "dial_code": "+232"
    },
    {
      "name": "Singapore",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Singapore.svg",
      "dial_code": "+65"
    },
    {
      "name": "Slovakia",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/e/e6/Flag_of_Slovakia.svg",
      "dial_code": "+421"
    },
    {
      "name": "Slovenia",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/f/f0/Flag_of_Slovenia.svg",
      "dial_code": "+386"
    },
    {
      "name": "Solomon Islands",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/7/74/Flag_of_the_Solomon_Islands.svg",
      "dial_code": "+677"
    },
    {
      "name": "Somalia",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/a/a0/Flag_of_Somalia.svg",
      "dial_code": "+252"
    },
    {
      "name": "South Africa",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/a/af/Flag_of_South_Africa.svg",
      "dial_code": "+27"
    },
    {
      "name": "South Georgia and the South Sandwich Islands",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/e/ed/Flag_of_South_Georgia_and_the_South_Sandwich_Islands.svg",
      "dial_code": "+500"
    },
    {
      "name": "Spain",
      "flag": "https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg",
      "dial_code": "+34"
    },
    {
      "name": "Sri Lanka",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/1/11/Flag_of_Sri_Lanka.svg",
      "dial_code": "+94"
    },
    {
      "name": "Sudan",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_Sudan.svg",
      "dial_code": "+249"
    },
    {
      "name": "Suriname",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/6/60/Flag_of_Suriname.svg",
      "dial_code": "+597"
    },
    {
      "name": "Swaziland",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/1/1e/Flag_of_Swaziland.svg",
      "dial_code": "+268"
    },
    {
      "name": "Sweden",
      "flag": "https://upload.wikimedia.org/wikipedia/en/4/4c/Flag_of_Sweden.svg",
      "dial_code": "+46"
    },
    {
      "name": "Switzerland",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/0/08/Flag_of_Switzerland_%28Pantone%29.svg",
      "dial_code": "+41"
    },
    {
      "name": "Syrian Arab Republic",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/5/53/Flag_of_Syria.svg",
      "dial_code": "+963"
    },
    {
      "name": "Taiwan",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/7/72/Flag_of_the_Republic_of_China.svg",
      "dial_code": "+886"
    },
    {
      "name": "Tajikistan",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/d/d0/Flag_of_Tajikistan.svg",
      "dial_code": "+992"
    },
    {
      "name": "Thailand",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg",
      "dial_code": "+66"
    },
    {
      "name": "Timor-Leste",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/2/26/Flag_of_East_Timor.svg",
      "dial_code": "+670"
    },
    {
      "name": "Togo",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/6/68/Flag_of_Togo.svg",
      "dial_code": "+228"
    },
    {
      "name": "Tokelau",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Flag_of_Tokelau.svg",
      "dial_code": "+690"
    },
    {
      "name": "Tonga",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Tonga.svg",
      "dial_code": "+676"
    },
    {
      "name": "Trinidad and Tobago",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Trinidad_and_Tobago.svg",
      "dial_code": "+1 868"
    },
    {
      "name": "Tunisia",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/c/ce/Flag_of_Tunisia.svg",
      "dial_code": "+216"
    },
    {
      "name": "Turkey",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg",
      "dial_code": "+90"
    },
    {
      "name": "Turkmenistan",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/1/1b/Flag_of_Turkmenistan.svg",
      "dial_code": "+993"
    },
    {
      "name": "Turks and Caicos Islands",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/a/a0/Flag_of_the_Turks_and_Caicos_Islands.svg",
      "dial_code": "+1 649"
    },
    {
      "name": "Tuvalu",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/3/38/Flag_of_Tuvalu.svg",
      "dial_code": "+688"
    },
    {
      "name": "Uganda",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/4/4e/Flag_of_Uganda.svg",
      "dial_code": "+256"
    },
    {
      "name": "Ukraine",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Ukraine.svg",
      "dial_code": "+380"
    },
    {
      "name": "United Arab Emirates",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_United_Arab_Emirates.svg",
      "dial_code": "+971"
    },
    {
      "name": "United Kingdom",
      "flag": "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg",
      "dial_code": "+44"
    },
    {
      "name": "United States",
      "flag": "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
      "dial_code": "+1"
    },
    {
      "name": "United States Minor Outlying Islands",
      "flag": "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
      "dial_code": "+1581"
    },
    {
      "name": "Uruguay",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Uruguay.svg",
      "dial_code": "+598"
    },
    {
      "name": "Uzbekistan",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/8/84/Flag_of_Uzbekistan.svg",
      "dial_code": "+998"
    },
    {
      "name": "Vanuatu",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Vanuatu.svg",
      "dial_code": "+678"
    },
    {
      "name": "Viet Nam",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg",
      "dial_code": "+84"
    },
    {
      "name": "Wallis and Futuna",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/d/d2/Flag_of_Wallis_and_Futuna.svg",
      "dial_code": "+681"
    },
    {
      "name": "Yemen",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/8/89/Flag_of_Yemen.svg",
      "dial_code": "+967"
    },
    {
      "name": "Zambia",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/0/06/Flag_of_Zambia.svg",
      "dial_code": "+260"
    },
    {
      "name": "Zimbabwe",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/6/6a/Flag_of_Zimbabwe.svg",
      "dial_code": "+263"
    }
  ]
  countryList2 = [{ "name": "Afghanistan", "dial_code": "+93", "code": "AF" }, { "name": "Albania", "dial_code": "+355", "code": "AL" }, { "name": "Algeria", "dial_code": "+213", "code": "DZ" }, { "name": "AmericanSamoa", "dial_code": "+1 684", "code": "AS" }, { "name": "Andorra", "dial_code": "+376", "code": "AD" }, { "name": "Angola", "dial_code": "+244", "code": "AO" }, { "name": "Anguilla", "dial_code": "+1 264", "code": "AI" }, { "name": "Antarctica", "dial_code": "+672", "code": "AQ" }, { "name": "Antigua and Barbuda", "dial_code": "+1268", "code": "AG" }, { "name": "Argentina", "dial_code": "+54", "code": "AR" }, { "name": "Armenia", "dial_code": "+374", "code": "AM" }, { "name": "Aruba", "dial_code": "+297", "code": "AW" }, { "name": "Australia", "dial_code": "+61", "code": "AU" }, { "name": "Austria", "dial_code": "+43", "code": "AT" }, { "name": "Azerbaijan", "dial_code": "+994", "code": "AZ" }, { "name": "Bahamas", "dial_code": "+1 242", "code": "BS" }, { "name": "Bahrain", "dial_code": "+973", "code": "BH" }, { "name": "Bangladesh", "dial_code": "+880", "code": "BD" }, { "name": "Barbados", "dial_code": "+1 246", "code": "BB" }, { "name": "Belarus", "dial_code": "+375", "code": "BY" }, { "name": "Belgium", "dial_code": "+32", "code": "BE" }, { "name": "Belize", "dial_code": "+501", "code": "BZ" }, { "name": "Benin", "dial_code": "+229", "code": "BJ" }, { "name": "Bermuda", "dial_code": "+1 441", "code": "BM" }, { "name": "Bhutan", "dial_code": "+975", "code": "BT" }, { "name": "Bolivia, Plurinational State of", "dial_code": "+591", "code": "BO" }, { "name": "Bosnia and Herzegovina", "dial_code": "+387", "code": "BA" }, { "name": "Botswana", "dial_code": "+267", "code": "BW" }, { "name": "Brazil", "dial_code": "+55", "code": "BR" }, { "name": "British Indian Ocean Territory", "dial_code": "+246", "code": "IO" }, { "name": "Brunei Darussalam", "dial_code": "+673", "code": "BN" }, { "name": "Bulgaria", "dial_code": "+359", "code": "BG" }, { "name": "Burkina Faso", "dial_code": "+226", "code": "BF" }, { "name": "Burundi", "dial_code": "+257", "code": "BI" }, { "name": "Cambodia", "dial_code": "+855", "code": "KH" }, { "name": "Cameroon", "dial_code": "+237", "code": "CM" }, { "name": "Canada", "dial_code": "+1", "code": "CA" }, { "name": "Cape Verde", "dial_code": "+238", "code": "CV" }, { "name": "Cayman Islands", "dial_code": "+ 345", "code": "KY" }, { "name": "Central African Republic", "dial_code": "+236", "code": "CF" }, { "name": "Chad", "dial_code": "+235", "code": "TD" }, { "name": "Chile", "dial_code": "+56", "code": "CL" }, { "name": "China", "dial_code": "+86", "code": "CN" }, { "name": "Christmas Island", "dial_code": "+61", "code": "CX" }, { "name": "Cocos (Keeling) Islands", "dial_code": "+61", "code": "CC" }, { "name": "Colombia", "dial_code": "+57", "code": "CO" }, { "name": "Comoros", "dial_code": "+269", "code": "KM" }, { "name": "Congo", "dial_code": "+242", "code": "CG" }, { "name": "Congo, The Democratic Republic of the", "dial_code": "+243", "code": "CD" }, { "name": "Cook Islands", "dial_code": "+682", "code": "CK" }, { "name": "Costa Rica", "dial_code": "+506", "code": "CR" }, { "name": "Cote d'Ivoire", "dial_code": "+225", "code": "CI" }, { "name": "Croatia", "dial_code": "+385", "code": "HR" }, { "name": "Cuba", "dial_code": "+53", "code": "CU" }, { "name": "Cyprus", "dial_code": "+537", "code": "CY" }, { "name": "Czech Republic", "dial_code": "+420", "code": "CZ" }, { "name": "Denmark", "dial_code": "+45", "code": "DK" }, { "name": "Djibouti", "dial_code": "+253", "code": "DJ" }, { "name": "Dominica", "dial_code": "+1 767", "code": "DM" }, { "name": "Dominican Republic", "dial_code": "+1 849", "code": "DO" }, { "name": "Ecuador", "dial_code": "+593", "code": "EC" }, { "name": "Egypt", "dial_code": "+20", "code": "EG" }, { "name": "El Salvador", "dial_code": "+503", "code": "SV" }, { "name": "Equatorial Guinea", "dial_code": "+240", "code": "GQ" }, { "name": "Eritrea", "dial_code": "+291", "code": "ER" }, { "name": "Estonia", "dial_code": "+372", "code": "EE" }, { "name": "Ethiopia", "dial_code": "+251", "code": "ET" }, { "name": "Falkland Islands (Malvinas)", "dial_code": "+500", "code": "FK" }, { "name": "Faroe Islands", "dial_code": "+298", "code": "FO" }, { "name": "Fiji", "dial_code": "+679", "code": "FJ" }, { "name": "Finland", "dial_code": "+358", "code": "FI" }, { "name": "France", "dial_code": "+33", "code": "FR" }, { "name": "French Guiana", "dial_code": "+594", "code": "GF" }, { "name": "French Polynesia", "dial_code": "+689", "code": "PF" }, { "name": "Gabon", "dial_code": "+241", "code": "GA" }, { "name": "Gambia", "dial_code": "+220", "code": "GM" }, { "name": "Georgia", "dial_code": "+995", "code": "GE" }, { "name": "Germany", "dial_code": "+49", "code": "DE" }, { "name": "Ghana", "dial_code": "+233", "code": "GH" }, { "name": "Gibraltar", "dial_code": "+350", "code": "GI" }, { "name": "Greece", "dial_code": "+30", "code": "GR" }, { "name": "Greenland", "dial_code": "+299", "code": "GL" }, { "name": "Grenada", "dial_code": "+1 473", "code": "GD" }, { "name": "Guadeloupe", "dial_code": "+590", "code": "GP" }, { "name": "Guam", "dial_code": "+1 671", "code": "GU" }, { "name": "Guatemala", "dial_code": "+502", "code": "GT" }, { "name": "Guernsey", "dial_code": "+44", "code": "GG" }, { "name": "Guinea", "dial_code": "+224", "code": "GN" }, { "name": "Guinea-Bissau", "dial_code": "+245", "code": "GW" }, { "name": "Guyana", "dial_code": "+595", "code": "GY" }, { "name": "Haiti", "dial_code": "+509", "code": "HT" }, { "name": "Holy See (Vatican City State)", "dial_code": "+379", "code": "VA" }, { "name": "Honduras", "dial_code": "+504", "code": "HN" }, { "name": "Hong Kong", "dial_code": "+852", "code": "HK" }, { "name": "Hungary", "dial_code": "+36", "code": "HU" }, { "name": "Iceland", "dial_code": "+354", "code": "IS" }, { "name": "India", "dial_code": "+91", "code": "IN" }, { "name": "Indonesia", "dial_code": "+62", "code": "ID" }, { "name": "Iran, Islamic Republic of", "dial_code": "+98", "code": "IR" }, { "name": "Iraq", "dial_code": "+964", "code": "IQ" }, { "name": "Ireland", "dial_code": "+353", "code": "IE" }, { "name": "Isle of Man", "dial_code": "+44", "code": "IM" }, { "name": "Israel", "dial_code": "+972", "code": "IL" }, { "name": "Italy", "dial_code": "+39", "code": "IT" }, { "name": "Jamaica", "dial_code": "+1 876", "code": "JM" }, { "name": "Japan", "dial_code": "+81", "code": "JP" }, { "name": "Jersey", "dial_code": "+44", "code": "JE" }, { "name": "Jordan", "dial_code": "+962", "code": "JO" }, { "name": "Kazakhstan", "dial_code": "+7 7", "code": "KZ" }, { "name": "Kenya", "dial_code": "+254", "code": "KE" }, { "name": "Kiribati", "dial_code": "+686", "code": "KI" }, { "name": "Korea, Democratic People's Republic of", "dial_code": "+850", "code": "KP" }, { "name": "Korea, Republic of", "dial_code": "+82", "code": "KR" }, { "name": "Kuwait", "dial_code": "+965", "code": "KW" }, { "name": "Kyrgyzstan", "dial_code": "+996", "code": "KG" }, { "name": "Lao People's Democratic Republic", "dial_code": "+856", "code": "LA" }, { "name": "Latvia", "dial_code": "+371", "code": "LV" }, { "name": "Lebanon", "dial_code": "+961", "code": "LB" }, { "name": "Lesotho", "dial_code": "+266", "code": "LS" }, { "name": "Liberia", "dial_code": "+231", "code": "LR" }, { "name": "Libyan Arab Jamahiriya", "dial_code": "+218", "code": "LY" }, { "name": "Liechtenstein", "dial_code": "+423", "code": "LI" }, { "name": "Lithuania", "dial_code": "+370", "code": "LT" }, { "name": "Luxembourg", "dial_code": "+352", "code": "LU" }, { "name": "Macao", "dial_code": "+853", "code": "MO" }, { "name": "Macedonia, The Former Yugoslav Republic of", "dial_code": "+389", "code": "MK" }, { "name": "Madagascar", "dial_code": "+261", "code": "MG" }, { "name": "Malawi", "dial_code": "+265", "code": "MW" }, { "name": "Malaysia", "dial_code": "+60", "code": "MY" }, { "name": "Maldives", "dial_code": "+960", "code": "MV" }, { "name": "Mali", "dial_code": "+223", "code": "ML" }, { "name": "Malta", "dial_code": "+356", "code": "MT" }, { "name": "Marshall Islands", "dial_code": "+692", "code": "MH" }, { "name": "Martinique", "dial_code": "+596", "code": "MQ" }, { "name": "Mauritania", "dial_code": "+222", "code": "MR" }, { "name": "Mauritius", "dial_code": "+230", "code": "MU" }, { "name": "Mayotte", "dial_code": "+262", "code": "YT" }, { "name": "Mexico", "dial_code": "+52", "code": "MX" }, { "name": "Micronesia, Federated States of", "dial_code": "+691", "code": "FM" }, { "name": "Moldova, Republic of", "dial_code": "+373", "code": "MD" }, { "name": "Monaco", "dial_code": "+377", "code": "MC" }, { "name": "Mongolia", "dial_code": "+976", "code": "MN" }, { "name": "Montenegro", "dial_code": "+382", "code": "ME" }, { "name": "Montserrat", "dial_code": "+1664", "code": "MS" }, { "name": "Morocco", "dial_code": "+212", "code": "MA" }, { "name": "Mozambique", "dial_code": "+258", "code": "MZ" }, { "name": "Myanmar", "dial_code": "+95", "code": "MM" }, { "name": "Namibia", "dial_code": "+264", "code": "NA" }, { "name": "Nauru", "dial_code": "+674", "code": "NR" }, { "name": "Nepal", "dial_code": "+977", "code": "NP" }, { "name": "Netherlands", "dial_code": "+31", "code": "NL" }, { "name": "Netherlands Antilles", "dial_code": "+599", "code": "AN" }, { "name": "New Caledonia", "dial_code": "+687", "code": "NC" }, { "name": "New Zealand", "dial_code": "+64", "code": "NZ" }, { "name": "Nicaragua", "dial_code": "+505", "code": "NI" }, { "name": "Niger", "dial_code": "+227", "code": "NE" }, { "name": "Nigeria", "dial_code": "+234", "code": "NG" }, { "name": "Niue", "dial_code": "+683", "code": "NU" }, { "name": "Norfolk Island", "dial_code": "+672", "code": "NF" }, { "name": "Northern Mariana Islands", "dial_code": "+1 670", "code": "MP" }, { "name": "Norway", "dial_code": "+47", "code": "NO" }, { "name": "Oman", "dial_code": "+968", "code": "OM" }, { "name": "Pakistan", "dial_code": "+92", "code": "PK" }, { "name": "Palau", "dial_code": "+680", "code": "PW" }, { "name": "Palestinian Territory, Occupied", "dial_code": "+970", "code": "PS" }, { "name": "Panama", "dial_code": "+507", "code": "PA" }, { "name": "Papua New Guinea", "dial_code": "+675", "code": "PG" }, { "name": "Paraguay", "dial_code": "+595", "code": "PY" }, { "name": "Peru", "dial_code": "+51", "code": "PE" }, { "name": "Philippines", "dial_code": "+63", "code": "PH" }, { "name": "Pitcairn", "dial_code": "+872", "code": "PN" }, { "name": "Poland", "dial_code": "+48", "code": "PL" }, { "name": "Portugal", "dial_code": "+351", "code": "PT" }, { "name": "Puerto Rico", "dial_code": "+1 939", "code": "PR" }, { "name": "Qatar", "dial_code": "+974", "code": "QA" }, { "name": "Romania", "dial_code": "+40", "code": "RO" }, { "name": "Russia", "dial_code": "+7", "code": "RU" }, { "name": "Rwanda", "dial_code": "+250", "code": "RW" }, { "name": "Réunion", "dial_code": "+262", "code": "RE" }, { "name": "Saint Barthélemy", "dial_code": "+590", "code": "BL" }, { "name": "Saint Helena, Ascension and Tristan Da Cunha", "dial_code": "+290", "code": "SH" }, { "name": "Saint Kitts and Nevis", "dial_code": "+1 869", "code": "KN" }, { "name": "Saint Lucia", "dial_code": "+1 758", "code": "LC" }, { "name": "Saint Martin", "dial_code": "+590", "code": "MF" }, { "name": "Saint Pierre and Miquelon", "dial_code": "+508", "code": "PM" }, { "name": "Saint Vincent and the Grenadines", "dial_code": "+1 784", "code": "VC" }, { "name": "Samoa", "dial_code": "+685", "code": "WS" }, { "name": "San Marino", "dial_code": "+378", "code": "SM" }, { "name": "Sao Tome and Principe", "dial_code": "+239", "code": "ST" }, { "name": "Saudi Arabia", "dial_code": "+966", "code": "SA" }, { "name": "Senegal", "dial_code": "+221", "code": "SN" }, { "name": "Serbia", "dial_code": "+381", "code": "RS" }, { "name": "Seychelles", "dial_code": "+248", "code": "SC" }, { "name": "Sierra Leone", "dial_code": "+232", "code": "SL" }, { "name": "Singapore", "dial_code": "+65", "code": "SG" }, { "name": "Slovakia", "dial_code": "+421", "code": "SK" }, { "name": "Slovenia", "dial_code": "+386", "code": "SI" }, { "name": "Solomon Islands", "dial_code": "+677", "code": "SB" }, { "name": "Somalia", "dial_code": "+252", "code": "SO" }, { "name": "South Africa", "dial_code": "+27", "code": "ZA" }, { "name": "South Georgia and the South Sandwich Islands", "dial_code": "+500", "code": "GS" }, { "name": "Spain", "dial_code": "+34", "code": "ES" }, { "name": "Sri Lanka", "dial_code": "+94", "code": "LK" }, { "name": "Sudan", "dial_code": "+249", "code": "SD" }, { "name": "Suriname", "dial_code": "+597", "code": "SR" }, { "name": "Svalbard and Jan Mayen", "dial_code": "+47", "code": "SJ" }, { "name": "Swaziland", "dial_code": "+268", "code": "SZ" }, { "name": "Sweden", "dial_code": "+46", "code": "SE" }, { "name": "Switzerland", "dial_code": "+41", "code": "CH" }, { "name": "Syrian Arab Republic", "dial_code": "+963", "code": "SY" }, { "name": "Taiwan, Province of China", "dial_code": "+886", "code": "TW" }, { "name": "Tajikistan", "dial_code": "+992", "code": "TJ" }, { "name": "Tanzania, United Republic of", "dial_code": "+255", "code": "TZ" }, { "name": "Thailand", "dial_code": "+66", "code": "TH" }, { "name": "Timor-Leste", "dial_code": "+670", "code": "TL" }, { "name": "Togo", "dial_code": "+228", "code": "TG" }, { "name": "Tokelau", "dial_code": "+690", "code": "TK" }, { "name": "Tonga", "dial_code": "+676", "code": "TO" }, { "name": "Trinidad and Tobago", "dial_code": "+1 868", "code": "TT" }, { "name": "Tunisia", "dial_code": "+216", "code": "TN" }, { "name": "Turkey", "dial_code": "+90", "code": "TR" }, { "name": "Turkmenistan", "dial_code": "+993", "code": "TM" }, { "name": "Turks and Caicos Islands", "dial_code": "+1 649", "code": "TC" }, { "name": "Tuvalu", "dial_code": "+688", "code": "TV" }, { "name": "Uganda", "dial_code": "+256", "code": "UG" }, { "name": "Ukraine", "dial_code": "+380", "code": "UA" }, { "name": "United Arab Emirates", "dial_code": "+971", "code": "AE" }, { "name": "United Kingdom", "dial_code": "+44", "code": "GB" }, { "name": "United States", "dial_code": "+1", "code": "US" }, { "name": "Uruguay", "dial_code": "+598", "code": "UY" }, { "name": "Uzbekistan", "dial_code": "+998", "code": "UZ" }, { "name": "Vanuatu", "dial_code": "+678", "code": "VU" }, { "name": "Venezuela, Bolivarian Republic of", "dial_code": "+58", "code": "VE" }, { "name": "Viet Nam", "dial_code": "+84", "code": "VN" }, { "name": "Virgin Islands, British", "dial_code": "+1 284", "code": "VG" }, { "name": "Virgin Islands, U.S.", "dial_code": "+1 340", "code": "VI" }, { "name": "Wallis and Futuna", "dial_code": "+681", "code": "WF" }, { "name": "Yemen", "dial_code": "+967", "code": "YE" }, { "name": "Zambia", "dial_code": "+260", "code": "ZM" }, { "name": "Zimbabwe", "dial_code": "+263", "code": "ZW" }, { "name": "Åland Islands", "dial_code": "+358", "code": "AX" }];

}
