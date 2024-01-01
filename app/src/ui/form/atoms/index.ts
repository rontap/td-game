import String from "./String";
import Number from "./Number";
import Checkbox from "./Checkbox";
import Restricted from "./Restricted";
import Textarea from "./Textarea";
import _JSON from "./JSON";
import Enum from "./Enum";

const Atoms = {
    String,
    Number,
    Checkbox,
    Textarea,
    JSON: _JSON,
    Restricted,
    Enum
}

export default Atoms