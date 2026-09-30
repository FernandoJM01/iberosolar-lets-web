// callModules.js
import { loadNavbar, loadFooter, loadFloating } from './ModulesJS/modules.js';

$(document).ready(function(){
  // Load other modules
  loadNavbar("static");
  loadFooter();
  loadFloating();
});


