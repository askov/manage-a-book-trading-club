export default function(value: string, cutLength: number): string {
  if (!value) { return ''; }
  const val = value.toString();
  return val.slice(0, cutLength) + (val.length > cutLength ? '…' : '');
}
