import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Image as ImageIcon, Video, Music, Mic, Zap, Search, 
  MessageSquare, Camera, Sparkles, Settings2, Download, Play, Square, Loader2, X
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { auth, loginWithGoogle, logout, db } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, addDoc, serverTimestamp, query, where, getDocs, orderBy, limit } from 'firebase/firestore';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

// We define a fallback layout for the lab.
export default function AILab() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingCode, setLoadingCode] = useState(true);
  
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoadingCode(false);
    });
    return unsub;
  }, []);

  if (loadingCode) return <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto mb-4" /> Loading AI Laboratory...</div>;

  if (!user) {
    return (
      <div className="min-h-screen pt-32 px-6 flex flex-col items-center">
        <Sparkles className="w-16 h-16 text-accent mb-6 opacity-80" />
        <h1 className="text-4xl font-display uppercase tracking-widest mb-4">AI Laboratory</h1>
        <p className="text-dim max-w-lg text-center mb-10">
          Sign in to access advanced generative capabilities including Veo video generation, Lyria music tracks, high-fidelity images, and real-time voice intelligence.
        </p>
        <button 
          onClick={loginWithGoogle}
          className="bg-foreground text-background px-8 py-4 uppercase tracking-widest rounded text-sm font-semibold hover:bg-accent hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return <AILabDashboard user={user} />;
}

function AILabDashboard({ user }: { user: User }) {
  const [activeTab, setActiveTab] = useState('image');

  const tabs = [
    { id: 'image', label: 'Image Studio', icon: ImageIcon },
    { id: 'video', label: 'Video (Veo)', icon: Video },
    { id: 'music', label: 'Audio (Lyria)', icon: Music },
    { id: 'voice', label: 'Voice / TTS', icon: Mic },
    { id: 'vision', label: 'Analysis', icon: Search },
    { id: 'chat', label: 'Ultra-Fast Chat', icon: Zap },
  ];

  return (
    <div className="pt-24 flex min-h-screen bg-background relative overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 border-r border-border p-4 flex flex-col z-10 bg-card/50 backdrop-blur">
        <div className="mb-8 p-4 bg-black/20 rounded-lg border border-border">
          <div className="text-xs text-dimmer uppercase mb-1">Authenticated as</div>
          <div className="text-sm truncate text-accent">{user.email}</div>
          <button onClick={logout} className="text-xs text-dim hover:text-foreground mt-3 underline">Sign out</button>
        </div>
        
        <div className="space-y-2 flex-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === t.id 
                    ? 'bg-accent/10 text-accent border border-accent/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]' 
                    : 'text-dim hover:text-foreground hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon size={16} />
                {t.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto z-10 h-[calc(100vh-6rem)]">
        {activeTab === 'image' && <ImageStudio user={user} />}
        {activeTab === 'video' && <VideoStudio user={user} />}
        {activeTab === 'music' && <AudioStudio user={user} />}
        {activeTab === 'voice' && <VoiceStudio user={user} />}
        {activeTab === 'vision' && <VisionAnalysis user={user} />}
        {activeTab === 'chat' && <FastChat user={user} />}
      </div>
    </div>
  );
}

// -----------------------------------------------------
// 1. IMAGE STUDIO (gemini-3.1-flash-image-preview & gemini-3-pro-image-preview)
// -----------------------------------------------------
function ImageStudio({ user }: { user: User }) {
  const [prompt, setPrompt] = useState('A futuristic silverback gorilla wearing sunglasses, cyperpunk lighting');
  const [model, setModel] = useState('gemini-2.5-flash-image'); // Default to faster/more available model
  const [aspect, setAspect] = useState('16:9');
  const [size, setSize] = useState('1K');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [gallery, setGallery] = useState<{url: string, prompt: string, id: string}[]>([]);
  const [selectedImage, setSelectedImage] = useState<{url: string, prompt: string} | null>(null);

  // Fetch previous generations
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const q = query(
          collection(db, 'generations'),
          where('userId', '==', user.uid),
          where('type', '==', 'image'),
          orderBy('createdAt', 'desc'),
          limit(20)
        );
        const snapshot = await getDocs(q);
        const docs = snapshot.docs.map(doc => ({
          id: doc.id,
          url: doc.data().url, // In this demo, we might be storing 'base64_hidden' if real storage isn't used
          prompt: doc.data().prompt,
          ...doc.data()
        })).filter(d => d.url && d.url !== 'base64_hidden');
        setGallery(docs as any);
      } catch (e) {
        console.error("Gallery fetch failed:", e);
      }
    };
    fetchGallery();
  }, [user.uid]);
  
  // Note: SDK generateImages uses models
  const generate = async () => {
    setLoading(true);
    setResult('');
    try {
      // Use generateContent for nano banana series (gemini-2.5 / gemini-3.1)
      const res = await ai.models.generateContent({
        model,
        contents: { parts: [{ text: prompt }] },
        config: {
          imageConfig: {
            aspectRatio: aspect as any,
            imageSize: model.includes('3.1') ? size as any : undefined
          }
        }
      });

      let b64 = '';
      for (const part of res.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          b64 = `data:image/jpeg;base64,${part.inlineData.data}`;
          break;
        }
      }

      if (!b64) throw new Error('No image returned from model');
      
      setResult(b64);
      
      const newGen = {
        url: b64,
        prompt,
        id: Date.now().toString()
      };
      
      setGallery(prev => [newGen, ...prev]);

      // Save to db
      await addDoc(collection(db, 'generations'), {
        userId: user.uid,
        type: 'image',
        prompt,
        url: b64, // Storing full base64 in demo for immediate gallery persistence
        createdAt: serverTimestamp()
      });
    } catch (e) {
      console.error(e);
      alert('Generation failed: ' + String(e));
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h2 className="text-2xl font-display mb-6 tracking-widest uppercase flex items-center gap-2"><ImageIcon className="text-accent" /> Image Studio</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3 space-y-4">
          <textarea 
            className="w-full bg-black/30 border border-border rounded-lg p-4 outline-none focus:border-accent text-sm min-h-[120px]"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Describe the image you want to create..."
          />
          
          <button 
            disabled={loading}
            onClick={generate}
            className="w-full bg-accent/20 hover:bg-accent hover:text-black text-accent border border-accent p-3 rounded uppercase tracking-widest text-sm font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <><Loader2 className="animate-spin" size={16} /> Generating...</> : <><Sparkles size={16} /> Generate Image</>}
          </button>
        </div>
        
        <div className="space-y-4 bg-black/20 p-4 rounded-lg border border-border h-fit">
          <div className="text-xs uppercase text-dimmer mb-2 flex items-center gap-1"><Settings2 size={12}/> Settings</div>
          
          <label className="block">
            <span className="text-xs text-dim">Model</span>
            <select className="w-full bg-black border border-border p-2 rounded mt-1 text-xs" value={model} onChange={e => setModel(e.target.value)}>
              <option value="gemini-2.5-flash-image">Flash Image (Default)</option>
              <option value="gemini-3.1-flash-image-preview">Flash Image 3.1 (High Def)</option>
              <option value="gemini-3-pro-image-preview">Pro Image (High Quality)</option>
            </select>
          </label>

          <label className="block">
            <span className="text-xs text-dim">Aspect Ratio</span>
            <select className="w-full bg-black border border-border p-2 rounded mt-1 text-xs" value={aspect} onChange={e => setAspect(e.target.value)}>
              {['1:1', '2:3', '3:2', '3:4', '4:3', '9:16', '16:9', '21:9'].map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </label>
          
          {model.includes('pro') && (
            <label className="block">
              <span className="text-xs text-dim">Size / Quality</span>
              <select className="w-full bg-black border border-border p-2 rounded mt-1 text-xs" value={size} onChange={e => setSize(e.target.value)}>
                <option value="1K">1K Base</option>
                <option value="2K">2K Standard</option>
                <option value="4K">4K Studio</option>
              </select>
            </label>
          )}
        </div>
      </div>
      
      {result && (
        <div className="mt-8 p-4 bg-black/20 rounded-xl border border-border text-center overflow-hidden">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <img src={result} alt="Generated" className="max-w-full rounded shadow-2xl mx-auto max-h-[500px] object-contain cursor-zoom-in" onClick={() => setSelectedImage({ url: result, prompt })} />
            <div className="mt-4 flex justify-center gap-4">
               <button className="flex items-center gap-2 text-xs text-accent hover:underline" onClick={() => setSelectedImage({ url: result, prompt })}><Search size={14}/> View Full Size</button>
               <a href={result} download="generation.jpg" className="flex items-center gap-2 text-xs text-dim hover:text-foreground transition-colors"><Download size={14}/> Download</a>
            </div>
          </motion.div>
        </div>
      )}

      {/* GALLERY SECTION */}
      {gallery.length > 0 && (
        <div className="mt-12 pt-8 border-t border-border">
          <h3 className="text-xl font-display mb-6 tracking-widest uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            Generation Archive
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {gallery.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group relative aspect-square bg-card border border-border rounded-lg overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(item)}
              >
                <img 
                  src={item.url} 
                  alt={item.prompt} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                   <p className="text-[10px] text-white line-clamp-2 leading-tight">{item.prompt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* FULL SIZE MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            >
              <X size={32} />
            </button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-full max-h-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.url} 
                alt="Full Size" 
                className="max-w-full max-h-[80vh] rounded-lg shadow-2xl object-contain border border-white/10" 
              />
              <div className="mt-6 bg-card border border-border p-6 rounded-xl max-w-2xl w-full">
                <div className="text-[10px] uppercase tracking-widest text-accent mb-2 font-mono">Prompt Metadata</div>
                <p className="text-sm font-light text-foreground leading-relaxed italic">"{selectedImage.prompt}"</p>
                <div className="mt-4 flex justify-end">
                   <a 
                     href={selectedImage.url} 
                     download="silverback-generation.jpg"
                     className="flex items-center gap-2 text-xs bg-white/5 hover:bg-white/10 px-4 py-2 rounded transition-all"
                   >
                     <Download size={14} /> Download Image
                   </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// -----------------------------------------------------
// 2. VIDEO STUDIO (veo-3.1-fast-generate-preview)
// -----------------------------------------------------
function VideoStudio({ user }: { user: User }) {
  const [prompt, setPrompt] = useState('Cinematic drone shot over a neon-lit futuristic city... ');
  const [aspect, setAspect] = useState('16:9');
  
  return (
    <div className="max-w-4xl mx-auto animate-fade-in relative">
      <h2 className="text-2xl font-display mb-6 tracking-widest uppercase flex items-center gap-2"><Video className="text-accent" /> Veo Generation</h2>
      
      <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg mb-6 text-sm text-orange-200">
        Note: Veo SDK generation (veo-3.1-fast-generate-preview) requires asynchronous polling in production. The UI is mocked for interactive testing.
      </div>
      
      <div className="space-y-4">
        <textarea 
          className="w-full bg-black/30 border border-border rounded-lg p-4 outline-none focus:border-accent text-sm min-h-[120px]"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Video prompt..."
        />
        
        <div className="flex gap-4">
           <label className="block w-48">
            <span className="text-xs text-dim">Aspect Ratio</span>
            <select className="w-full bg-black border border-border p-2 rounded mt-1 text-xs" value={aspect} onChange={e => setAspect(e.target.value)}>
               <option value="16:9">16:9 (Landscape)</option>
               <option value="9:16">9:16 (Portrait)</option>
            </select>
          </label>
        </div>

        <button 
            className="bg-accent/20 hover:bg-accent hover:text-black text-accent border border-accent px-6 py-3 rounded uppercase tracking-widest text-sm font-semibold transition-colors flex items-center gap-2"
            onClick={() => alert("Simulating Veo job creation for: " + prompt)}
          >
            <Sparkles size={16} /> Generate Video
        </button>
      </div>
    </div>
  );
}

// -----------------------------------------------------
// 3. AUDIO STUDIO (lyria-3-clip-preview)
// -----------------------------------------------------
function AudioStudio({ user }: { user: User }) {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h2 className="text-2xl font-display mb-6 tracking-widest uppercase flex items-center gap-2"><Music className="text-accent" /> Music (Lyria)</h2>
      <p className="text-dim mb-6 text-sm">Generate lyria-3-clip-preview tracks (up to 30s) or lyria-3-pro-preview (full length).</p>
      
      <div className="bg-black/30 p-6 rounded-lg border border-border">
         <div className="flex gap-4">
           <input type="text" className="flex-1 bg-black border border-border p-3 rounded outline-none focus:border-accent" placeholder="E.g., A heavy synthwave track with driving bass" />
           <select className="bg-black border border-border p-3 rounded">
             <option value="clip">Clip (30s)</option>
             <option value="pro">Pro (Full)</option>
           </select>
           <button className="bg-accent text-black px-6 font-semibold uppercase tracking-widest rounded"><Play size={16} className="inline mr-2 -mt-1"/> Generate</button>
         </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------
// 4. TTS (gemini-3.1-flash-tts-preview)
// -----------------------------------------------------
function VoiceStudio({ user }: { user: User }) {
  const [text, setText] = useState('Welcome to Silverback Intelligence. How can I assist you today?');
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generateTTS = async () => {
    setLoading(true);
    try {
      const res = await ai.models.generateContent({
        model: 'gemini-3.1-flash-tts-preview',
        contents: text
      });
      // Try to parse audio if available, normally it's inlineData with MIME audio/mp3
      alert('TTS Generated! (Check console for raw blob structure in a real genenv)');
    } catch(e) {
      console.error(e);
      alert('Error: ' + String(e));
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
       <h2 className="text-2xl font-display mb-6 tracking-widest uppercase flex items-center gap-2"><Mic className="text-accent" /> Text to Speech</h2>
       <textarea 
          className="w-full bg-black/30 border border-border rounded-lg p-4 outline-none focus:border-accent text-sm min-h-[120px] mb-4"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button onClick={generateTTS} disabled={loading} className="bg-accent/20 hover:bg-accent hover:text-black text-accent border border-accent p-3 rounded uppercase tracking-widest text-sm font-semibold transition-colors flex items-center justify-center gap-2">
           {loading ? 'Processing...' : 'Generate Speech'}
        </button>
    </div>
  )
}

// -----------------------------------------------------
// 5. VISION & VIDEO ANALYSIS (gemini-3.1-pro-preview)
// -----------------------------------------------------
function VisionAnalysis({ user }: { user: User }) {
  const [fileMode, setFileMode] = useState<'image'|'video'>('image');
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
       <h2 className="text-2xl font-display mb-6 tracking-widest uppercase flex items-center gap-2"><Search className="text-accent" /> Deep Analysis</h2>
       <p className="text-dim mb-6 text-sm">Upload images or videos for advanced reasoning using <strong className="text-accent">gemini-3.1-pro-preview</strong>.</p>
       
       <div className="border border-dashed border-border rounded-xl p-12 text-center text-dim hover:border-accent hover:text-foreground transition-colors cursor-pointer bg-black/20">
         <Camera className="mx-auto mb-4 opacity-50 w-12 h-12" />
         <p>Drag and drop a file, or click to browse</p>
         <p className="text-xs mt-2 opacity-50">Supports JPG, PNG, MP4, MOV</p>
       </div>
    </div>
  )
}

// -----------------------------------------------------
// 6. FAST CHAT / LOW LATENCY (gemini-3.1-flash-lite-preview)
// -----------------------------------------------------
function FastChat({ user }: { user: User }) {
  const [msgs, setMsgs] = useState<{my: boolean, text: string}[]>([]);
  const [input, setInput] = useState('');
  
  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const txt = input;
    setMsgs(prev => [...prev, { my: true, text: txt }]);
    setInput('');
    
    try {
      const res = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-preview',
        contents: txt
      });
      setMsgs(prev => [...prev, { my: false, text: res.text || '...' }]);
    } catch (e) {
        setMsgs(prev => [...prev, { my: false, text: `Error: ${String(e)}` }]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-10rem)] animate-fade-in">
       <div className="flex items-center justify-between mb-4">
         <h2 className="text-2xl font-display tracking-widest uppercase flex items-center gap-2"><Zap className="text-accent" /> Flash Lite Chat</h2>
         <span className="text-[10px] uppercase border border-accent/30 text-accent bg-accent/10 px-2 py-1 rounded">Low Latency Mode</span>
       </div>
       
       <div className="flex-1 bg-black/20 border border-border rounded-xl p-4 overflow-y-auto mb-4 flex flex-col gap-4">
         {msgs.length === 0 && <div className="m-auto text-dimmer italic text-sm">Start a blazingly fast conversation...</div>}
         {msgs.map((m, i) => (
           <div key={i} className={`p-3 rounded-xl max-w-[80%] ${m.my ? 'bg-accent text-black self-end' : 'bg-card border border-border self-start'} text-sm`}>
             {m.text}
           </div>
         ))}
       </div>
       
       <form onSubmit={send} className="flex gap-2">
         <input 
           type="text" 
           value={input}
           onChange={e => setInput(e.target.value)}
           className="flex-1 bg-black/30 border border-border p-3 rounded-lg outline-none focus:border-accent text-sm" 
           placeholder="Ask anything..."
         />
         <button className="bg-accent text-black px-6 rounded-lg font-semibold"><Sparkles size={16}/></button>
       </form>
    </div>
  )
}
