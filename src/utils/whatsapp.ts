import { CartItem } from '../types';
import { formatCurrency } from './formatCurrency';

export const CAFE_PHONE = '919839012840'; // Brew & Bean Civil Lines, Kanpur

/**
 * Generate a WhatsApp click-to-chat URL with cart items
 */
export function generateCartWhatsAppUrl(items: CartItem[], total: number, customerName?: string): string {
  if (!items || items.length === 0) {
    const defaultMsg = encodeURIComponent("Hi Brew & Bean! I have a question about your café menu.");
    return `https://wa.me/${CAFE_PHONE}?text=${defaultMsg}`;
  }

  let text = `Hi Brew & Bean! I'd like to place an order:\n\n`;

  items.forEach((item) => {
    let customText = '';
    if (item.customization) {
      const parts: string[] = [];
      if (item.customization.size) parts.push(item.customization.size);
      if (item.customization.milk) parts.push(item.customization.milk);
      if (item.customization.sweetness) parts.push(item.customization.sweetness);
      if (item.customization.extras && item.customization.extras.length > 0) {
        parts.push(`+ ${item.customization.extras.join(', ')}`);
      }
      if (parts.length > 0) {
        customText = ` (${parts.join(' · ')})`;
      }
    }
    text += `• ${item.quantity} × ${item.product.name}${customText} — ${formatCurrency(item.itemTotal)}\n`;
  });

  text += `\nTotal: ${formatCurrency(total)}`;
  if (customerName) {
    text += `\nName: ${customerName}`;
  }
  text += `\n\nPlease confirm availability & preparation time. Thank you!`;

  return `https://wa.me/${CAFE_PHONE}?text=${encodeURIComponent(text)}`;
}

/**
 * Generate a WhatsApp inquiry URL
 */
export function generateGeneralWhatsAppUrl(subject?: string): string {
  const text = subject
    ? `Hi Brew & Bean! I'd like to inquire about: ${subject}`
    : `Hi Brew & Bean! I'd like to check table availability for today.`;
  return `https://wa.me/${CAFE_PHONE}?text=${encodeURIComponent(text)}`;
}
