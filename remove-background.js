// Only remove pixels connected to the image border. Preserve enclosed artwork.
export function removeBackground(data,width,height,color,tolerance){
 const out=new Uint8ClampedArray(data),seen=new Uint8Array(width*height),queue=new Int32Array(width*height);let head=0,tail=0;
 const matches=i=>{let p=i*4;return data[p+3]===0||Math.max(Math.abs(data[p]-color[0]),Math.abs(data[p+1]-color[1]),Math.abs(data[p+2]-color[2]))<=tolerance};
 const add=i=>{if(i<0||i>=seen.length||seen[i])return;seen[i]=1;if(matches(i))queue[tail++]=i};
 for(let x=0;x<width;x++){add(x);add((height-1)*width+x)}for(let y=0;y<height;y++){add(y*width);add(y*width+width-1)}
 while(head<tail){const i=queue[head++];out[i*4+3]=0;const x=i%width;if(x>0)add(i-1);if(x<width-1)add(i+1);add(i-width);add(i+width)}return out;
}
