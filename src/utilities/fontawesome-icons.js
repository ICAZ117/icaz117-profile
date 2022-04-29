import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

// FONT AWESOME ICONS:
// Discord
import { faDiscord } from "@fortawesome/free-brands-svg-icons";

// Github
import { faGithub } from "@fortawesome/free-brands-svg-icons";

// Linkedin
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

// Email
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

library.add(faDiscord);
library.add(faGithub);
library.add(faLinkedin);
library.add(faEnvelope);

export default FontAwesomeIcon;