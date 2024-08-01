import { Devvit } from "@devvit/public-api";
import './triggers/modMailTrigger.js';
import './triggers/postSubmitTrigger.js';
import './triggers/commentCreateTrigger.js';
import './triggers/modActionTrigger.js';
// Add more imports for additional triggers

Devvit.configure({ redditAPI: true, http: true });

export default Devvit;
