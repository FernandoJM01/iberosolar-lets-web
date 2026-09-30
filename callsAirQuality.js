// callModules.js
import { loadNavbar, loadFooter } from './ModulesJS/modules.js';

$(document).ready(function(){
  // Load other modules
  loadNavbar("static");
  loadFooter();
});


