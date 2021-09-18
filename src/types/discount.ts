import {Product} from "./index";
import Comparison from "./comparison";

type Condition = {
  value: number;
  comparison: Comparison
  usageLimit: number
}

type Discount = {
  id: Product["id"];
  trigger: 'amount';
  condition: Condition;
  difference: number;
}

export default Discount;
