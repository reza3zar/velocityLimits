export class TransactionResponse{
  id: string;
  customer_id: string;
  accepted: boolean;
 
  constructor(transaction_id: string, customer_id: string,accepted:boolean) {
    this.id = transaction_id;
    this.customer_id = customer_id;
    this.accepted = accepted;
  }
  
}  