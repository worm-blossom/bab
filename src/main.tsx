import {
  AccessStruct,
  AccessTuple,
  Application,
  Bib,
  Bibliography,
  BlankPattern,
  Br,
  DefValue,
  Dfn,
  Else,
  ElseIf,
  Enum,
  Gt,
  If,
  Img,
  Interface,
  Let,
  LetRaw,
  Loc,
  Lt,
  Match,
  QualifiedMember,
  Self,
  SpliceLoc,
  Struct,
  StructDef,
  Sup,
  Tuple,
  TupleType,
  TypeApplication,
  Table,
  Tr,
  Td,
  Tbody,
  Th,
  Thead,
  H6,
} from "macromaniajsx/jsx-runtime";
import {
  A,
  Code,
  Context,
  Counter,
  Def,
  Em,
  FunctionItem,
  Hsection,
  Li,
  M,
  makeFigureMacro,
  makeNumberingRenderer,
  Marginale,
  MM,
  P,
  PreviewScope,
  Pseudocode,
  R,
  Rc,
  Rcb,
  ResolveAsset,
  Return,
  Rs,
  Rsb,
  Sidenote,
  Span,
  Ul,
  Wip,
  Expressions,
  Expression,
} from "macromaniajsx/jsx-runtime";
import { ArticleTemplate } from "./articleTemplate.tsx";
import {
  BigO,
  Curly,
  Cyan,
  Magenta,
  Sum,
  Pr,
  E,
  Exp,
  Mathfrak,
  MAligned,
  MCeil,
  MFrac,
  MFunDef,
  MLog,
  MSet,
  NoWrap,
  Np,
  MParen,
  OpName,
  Orange,
  Pink,
  Quotes,
  Rank,
  TreeChild,
  TreeChildren,
  TreeItem,
  Turbo1,
  Turbo10,
  Turbo11,
  Turbo12,
  Turbo13,
  Turbo14,
  Turbo15,
  Turbo16,
  Turbo2,
  Turbo3,
  Turbo4,
  Turbo5,
  Turbo6,
  Turbo7,
  Turbo8,
  Turbo9,
} from "./macros.tsx";
import { TreeItems } from "./macros.tsx";
import { GeoDistribution } from "./macros.tsx";
import { Access, ApplicationRaw, Assign, AssignRaw, CommentLine, DefField, DefFunction, DefType, FunctionItemUntyped, Gte, Hr, Rb } from "../deps.ts";

const ctx = new Context();

function Alj({children, inline}: {children?: Expressions, inline?: boolean}): Expression {
  return <Wip fg="#6804cc" bg="#ecdbfc" wrap={(_ctx, inner) => <>alj: {inner}</>} children={children} inline={inline}/>;
}

/*
Create macros for figures (which includes theorem-like blocks).
*/

const figureCounter = new Counter("figure-counter", 0);
const Fig = makeFigureMacro(ctx, {
  figureCounter: figureCounter,
  numberingInfo: {
    r: "Figure",
    rb: "Figure",
    rs: "Figures",
    rsb: "Figures",
    render: makeNumberingRenderer(),
  },
});

// A counter shared by several theorem-like blocks.
const thmCounter = new Counter("thm-counter", 0);

const Definition = makeFigureMacro(ctx, {
  figureCounter: thmCounter,
  numberingInfo: {
    r: "Definition",
    rb: "Definition",
    rs: "Definition",
    rsb: "Definition",
    render: makeNumberingRenderer(),
  },
  isTheoremLike: true,
});

// The full input to Macromania is a single expression, which we then evaluate.
const exp = (
  <ArticleTemplate
    title="Bab"
    titleId="title"
    abstract={
      <>
        <P>
          Bab is a <A href="https://en.wikipedia.org/wiki/Cryptographic_hash_function">secure hash function</A> heavily inspired by Blake3, designed for use in peer-to-peer content-addressed storage systems.
        </P>
      </>
    }
    authors={[
      {
        name: <A href="https://aljoscha-meyer.de/">Aljoscha Meyer</A>,
        email: <A href="mailto:research@aljoscha-meyer.de">research@aljoscha-meyer.de</A>,
      },
    ]}
  >
    <Hsection n="introduction" title="Introduction">
      <P>
        <A href="https://en.wikipedia.org/wiki/Content-addressable_storage">Content-addressable storage</A> lets users refer to strings (files) by a secure hash. Bab is a specification for a hash function specifically designed for usage in peer-to-peer content-addressable storage systems.
      </P>      

      <P>
        The key feature of Bab is that it allows holders of a string to authenticate any substring as occuring in the original string. Content-addressed storage systems without this feature face a problem in byzanthine environments. Suppose a client requests the string corresponding to some hash. The server replies with some data, but the connection is interrupted before the full string was transfered. What should the client do?
      </P>

      <P>
        It could store the data it received, and later it could issue a request for the same string, resuming at the correct offset. But that request will fail if the orginal server fed it garbage, and the client will be unable to tell which of its two communication partners acted maliciously. Also, the server might have sent it data that is illegal to store. Hence, a careful client should discard all incomplete data it received. But this makes it highly unlike to successfully transfer large strings over an unreliable network.
      </P>

      <P>
        When strings are hashed with Bab, servers embed into the data stream efficiently verifiable proofs that the data they have sent so far is indeed part of the requested string. More specifically, Bab enables the following features (all of which will be explained in detail in <Rc n="requests"/>):
      </P>

      <Ul>
        <Li>secure content-addressing,</Li>
        <Li>incremental verification of streaming string data,</Li>
        <Li>efficient verification of arbitrary subslices within a string, and</Li>
        <Li>constant-size length proofs for strings.<Marginale>While we explore Bab in the context of hashing, you can also think of it as an <Bib item="tamassia2003authenticated">authenticated data structure</Bib> for arrays.</Marginale></Li>
      </Ul>

      <P>
        Bab employs many of the same techniques as the <A href="https://github.com/BLAKE3-team/BLAKE3-specs/blob/master/blake3.pdf">Blake3</A>-based <A href="https://github.com/oconnor663/bao/blob/master/docs/spec.md">Bao</A> spec. Key differences are short proofs of string length, more efficient slice requests, and a hash-function-agnostic specification. Bao is a byproduct of a well-designed general-purpose hash function, whereas Bab is a special-purpose hash function that gets to add features beyond Bao’s capabilities.
      </P>

      <P>
        We first define Bab in <Rc n="the_function"/>, before thoroughly explaining and justifying the design in <Rc n="rationale"/>, both from a high-level view and in its details. We examine optimizations for verified streaming in <Rc n="optimizations"/>.
      </P>
    </Hsection>

    <Hsection n="the_function" title="The Bab Hash Function">
      <P>
        Like Blake3, Bab hashes an input string by splitting it into chunks, arranging the chunks as the roots of a <A href="https://en.wikipedia.org/wiki/Binary_tree">binary</A>, <A href="https://en.wikipedia.org/wiki/Binary_tree#complete">left-full</A> <A href="https://en.wikipedia.org/wiki/Merkle_tree">Merkle-tree</A>; the label of the root becomes the digest of the input.
      </P>

      <Hsection n="parameters" title="Parameters">
        <P>
          Bab leaves open some paramters, they need to be given as <Quotes>input</Quotes> to the Bab specification. We now list the precise parameters of a Bab instantiation.
        </P>

        <PreviewScope>
          <P>
            The <DefValue n="chunk_size" math={`chunk\\_size`}/> value must be a natural number greater than zero.
            Given an input bytestring <DefValue n="in"/> of at most <M>2^<Curly>64</Curly> - 1</M> bytes, Bab splits it into a non-empty sequence <DefValue n="chunks"/> of <Def n="chunk" rs="chunks">chunks</Def>: the first <R n="chunk_size"/> bytes become the first <R n="chunk"/>, the next <R n="chunk_size"/> bytes become the second <R n="chunk"/>, and so on.
            Only the final <R n="chunk"/> may be shorter than <R n="chunk_size"/>.
            For example, splitting the ASCII string <Code>hello_world</Code> with a <R n="chunk_size"/> of <Code>2</Code> yields the <Rs n="chunk"/> <Code>he</Code>, <Code>ll</Code>, <Code>o_</Code>, <Code>wo</Code>, <Code>rl</Code>, and <Code>d</Code>.
            If <R n="in"/> is the empty string, then <R n="chunks"/> consists of a single, empty <R n="chunk"/>.
          </P>
        </PreviewScope>

        <PreviewScope>
          <P>
            The <DefValue n="width"/> value must be a natural number greater than zero. Bab maps input bytestrings (of at most <M>2^<Curly>64</Curly> - 1</M> bytes) to digests of <R n="width"/> many bytes.
          </P>
        </PreviewScope>

        <PreviewScope>
          <P>
            The <DefFunction n="hash_chunk"/> function determines the labels of the leaf nodes of Bab’s Merkle-tree.
            It must be a function that maps a triplet of a <R n="chunk"/>, a chunk index (a natural number between zero and <Code>ceil(<M>2^<Curly>64</Curly> - 1</M>, <R n="chunk_size"/>)</Code>), and a boolean flag (whether the node is the root node or not) to bytestrings of <R n="width"/> bytes.
          </P>
        </PreviewScope>

        <PreviewScope>
          <P>
            The <DefFunction n="hash_inner"/> function determines the labels of the inner nodes of Bab’s Merkle-tree.
            It must be a function that maps a quadruplet of two bytestrings of <R n="width"/> bytes (the labels of the two child nodes), an unsigned 64-bit integer (the length of the input substring covered by the node), and a boolean flag (whether the node is the root node or not) to bytestrings of <R n="width"/> bytes.            
          </P>
        </PreviewScope>
      </Hsection>

      <Hsection n="tree" title="The Merkle Tree">
        <P>
          To hash a bytestring <R n="in"/> that was split into a <R n="chunk"/> sequence <R n="chunks"/>, Bab constructs a <A href="https://en.wikipedia.org/wiki/Binary_tree#complete">left-full</A> <A href="https://en.wikipedia.org/wiki/Binary_tree">binary</A> tree with one leaf per <R n="chunk"/>; we number the vertices in <A href="https://en.wikipedia.org/wiki/Tree_traversal#Breadth-first_search">depth-first</A> order, prioritizing left children over right children, starting at <M>1</M> in the root. <Rc n="fig_tree_unlabeled"/> shows an example.
        </P>

        <Fig
          n="fig_tree_unlabeled"
          // wrapperTagProps={{clazz: "wide"}}
          title="Unlabeled Example Tree"
          caption={
            <>
              <P>
                The (unlabeled) binary tree for the input string <Code>hello_world</Code> with a <R n="chunk_size"/> of <Code>2</Code>.
              </P>
            </>
          }
        >
          <Img
            src={<ResolveAsset asset={["graphics", "tree_unlabeled.svg"]} />}
            alt="A left-full binary tree, the result of giving the input string *hello_world*."
          />
        </Fig>

        <PreviewScope>
          <P>
            Bab assigns to each vertex <DefValue n="lblv" r="v"/> a label <ApplicationRaw fun={<DefFunction n="lbl"/>} args={[<R n="lblv"/>]}/>; the root label serves as the <DefValue n="digest" rs="digests"/> of <R n="in"/>.
          </P>

          <P>
            If <R n="lblv"/> is a leaf vertex corresponding to the <DefValue n="lbl_leaf_i" r="i"/>-th <R n="chunk"/> (zero-indexed) <DefValue n="lbl_leaf_c" r="c"/>, then <Application fun="lbl" args={[<R n="lblv"/>]}/> is <Application fun="hash_chunk" args={[<R n="lbl_leaf_c"/>, <R n="lbl_leaf_i"/>, "true"]}/> if <R n="lbl_leaf_c"/> is the <Em>only</Em> <R n="chunk"/> in <R n="chunks"/>, and <Application fun="hash_chunk" args={[<R n="lbl_leaf_c"/>, <R n="lbl_leaf_i"/>, "false"]}/>, otherwise.
          </P>

          <P>
            If <R n="lblv"/> is an inner vertex, let <DefValue n="lbl_inner_l" r="left"/> denote its left child, let <DefValue n="lbl_inner_r" r="right"/> denote its right child, let <DefValue n="lbl_inner_len" r="len"/> denote the total length of the <Rs n="chunk"/> corresponding to all leaf descendents of <R n="lblv"/>, and let <DefValue n="lbl_inner_is_root" r="is_root"/> be <Code>true</Code> if and only if <R n="lblv"/> is the root of the tree.
            Then <Application fun="lbl" args={[<R n="lblv"/>]}/> is <Application fun="hash_inner" args={[<R n="lbl_inner_l"/>, <R n="lbl_inner_r"/>, <R n="lbl_inner_len"/>, <R n="lbl_inner_is_root"/>]}/>.
          </P>
        </PreviewScope>

        <P>
          <Rc n="fig_tree_labeled"/> demonstrates the label computation in the example Merkle-tree:
        </P>

        <Fig
          n="fig_tree_labeled"
          wrapperTagProps={{clazz: "wide"}}
          title="Labeled Example Tree"
          caption={
            <>
              <P>
                The label computations for the example tree in <Rc n="fig_tree_unlabeled"/>.
              </P>
            </>
          }
        >
          <Img
            src={<ResolveAsset asset={["graphics", "tree_labeled.svg"]} />}
            alt="A left-full binary tree, where each vertex shows how to compute its label."
          />
        </Fig>
        
      </Hsection>

      <Hsection n="instantiations" title="Instantiations">
        <P>
          The choice of parameters for using Bab is open, but some care needs to be taken to create a secure (i.e., collision-resistant and preimage-resistant) hash function. <R n="hash_chunk"/> and <R n="hash_inner"/> must be secure hash functions themselves, and it must further be impossible to find an input to <R n="hash_chunk"/> and one to <R n="hash_inner"/> such that both yield the same digest.
        </P>

        <P>
          We supply two useful instantiations: one based on arbitrary secure hash functions, and a more efficient one that closely mimics Blake3.
        </P>

        <Hsection n="instantiations_from_secure" title="Via Conventional Hash Function">
          <PreviewScope>
            <P>
              Given a conventional, secure hash function <DefFunction n="conv_h" r="h"/> of digest size <DefValue n="conv_width" r="w"/>, we can instantiate Bab for a <R n="width"/> of <R n="conv_width"/> and an arbitrary <R n="chunk_size"/>.
            </P>

            <P>
              Define <Application fun="hash_chunk" args={[<DefValue n="conv_chunk_chunk" r="chunk"/>, <DefValue n="conv_chunk_i" r="index"/>, <DefValue n="conv_chunk_root" r="is_root"/>]}/> as applying <R n="conv_h"/> to the concatenation of
                <Ul>
                  <Li>
                    the byte <Code>0x00</Code> if <R n="conv_chunk_root"/> is <Code>false</Code>, or the byte <Code>0x01</Code> otherwise,
                  </Li>
                  <Li>
                    <R n="conv_chunk_i"/> encoded as an unsigned big-endian 64-bit integer, and
                  </Li>
                  <Li>
                    <R n="conv_chunk_chunk"/>.
                  </Li>
                </Ul>
            </P>

            <P>
              Define <Application fun="hash_inner" args={[<DefValue n="conv_inner_l" r="left"/>, <DefValue n="conv_inner_r" r="right"/>, <DefValue n="conv_inner_len" r="len"/>, <DefValue n="conv_inner_root" r="is_root"/>]}/> as applying <R n="conv_h"/> to the concatenation of
                <Ul>
                  <Li>
                    the byte <Code>0x02</Code> if <R n="conv_inner_root"/> is <Code>false</Code>, or the byte <Code>0x03</Code> otherwise,
                  </Li>
                  <Li>
                    <R n="conv_inner_len"/> encoded as an unsigned big-endian 64-bit integer,
                  </Li>
                  <Li>
                    <R n="conv_inner_l"/>, and
                  </Li>
                  <Li>
                    <R n="conv_inner_r"/>.
                  </Li>
                </Ul>
            </P>
          </PreviewScope>
        </Hsection>
        
        <Hsection n="instantiations_william" title="William3">
          <PreviewScope>
            <P>
              <DefFunction n="william3" r="William3" rb="William3"/> is a Bab instantiation that is almost identical to Blake3. The only difference is that <R n="william3"/> incorporates a length value into the label computation of inner tree vertices. <Rb n="william3"/> has a normal hash mode and a keyed hash mode (based on a 256 bit key); unlike Blake3 it does not support a key derivation mode.
            </P>

            <P>
              <Rb n="william3"/> uses a <R n="chunk_size"/> of 1024 bytes (just like Blake3). Its <R n="width"/> is 32 bytes (just like Blake3). The <R n="hash_chunk"/> function is identical to the Blake3 computation of <Em>chunk chaining values</Em>. The <R n="hash_inner"/> function is almost identical to the Blake3 computation of <Em>parent node chaining values</Em>, with a single exception: whereas Blake3 sets the <Code>t</Code> parameter of its compression function to 0, <R n="william3"/> sets <Code>t</Code> to the third argument (the length value) of <R n="hash_chunk"/> (as an unsigned <Em>little</Em>-endian 64-bit integer).
            </P>
          </PreviewScope>
        </Hsection>
      </Hsection>
    </Hsection>

    <Hsection n="rationale" title="Design Rationale">
      <P>
        We now explain the decisions that went into the definition of the Bab hash function.
      </P>

      <Hsection n="streaming_verification" title="Streaming Verification">
        <P>
          Using the root label of a Merkle-tree as the digest opens up the option of incrementally verifying a string as it is being received as belonging to the requested hash. To do so, the transmission of each chunk is preceded by the labels of the left and right children of all inner vertices on the path from the root of the tree to the chunk. As an optimization, each label is transmitted at most once; it is the receiver’s responsibility to cache labels until they are not needed for verification any longer. At the very start of the transmission, the length of the string has to be sent. 
        </P>

        <P>
          As an example, consider again <Rc n="fig_tree_labeled"/>. To stream the string <Code>hello_world</Code> and allow a receiving client to verify data integrity along the way, a server first sends the length of the string (11 bytes), followed by the labels of the left and right children of the root (<Application fun="lbl" args={["2"]}/> and <Application fun="lbl" args={["2"]}/>). When the client receives those labels, it can feed them into <R n="hash_inner"/>, to verify that the result equals the original digest (i.e., the root label). If the Bab instantiation is secure, then the server cannot possibly have fabricated these values — the two supplied values must indeed have been labels of the Merkle tree.
        </P>

        <P>
          Having transmitted the labels of the left and right children of the root, the data stream continues with the labels of the left and right children of the next vertex on the path from the root to the first chunk: that vertex is <M>2</M>, so the transmitted labels are <Application fun="lbl" args={["3"]}/> and <Application fun="lbl" args={["6"]}/>. The client can then verify that feeding them into <R n="hash_inner"/> yields the (already verified) label of vertex <M>2</M>. Next in the stream, vertex <M>3</M> contributes its two child labels, which are again verified.
        </P>

        <P>
          Next, the stream contains the raw chunk corresponding to vertex <M>4</M>: <Code>he</Code>. The client puts that data (and its chunk index) into <R n="hash_chunk"/>, to verify that it indeed yields the previously transmitted label of vertex <M>4</M>.
        </P>

        <P>
          The next chunk to verify corresponds to vertex <M>5</M>, so now we need the labels of all children of the inner vertices on the path from the root to vertex <M>5</M>. All of these vertices (<M>1, 2, 3</M>) have <Em>already</Em> contributed their child labels earlier in the response stream, so all of those are skipped. The next bit of data in the stream is the second chunk: <Code>ll</Code>.
        </P>

        <P>
          The third chunk is slightly more interesting: on the path from the root to it (<M>1, 2, 6, 7</M>), the final <Em>two</Em> vertices have not contributed yet. Hence, the stream resumes with the labels of the children of vertex <M>6</M>, followed by the chunk corresponding to vertex <M>7</M>: <Code>o_</Code>.
        </P>

        <P>
          The response stream continues in this fashion; <Rc n="fig_stream"/> visualizes and lists the full stream:
        </P>

        <Fig
          n="fig_stream"
          // wrapperTagProps={{clazz: "wide"}}
          title="Verifiable Streaming Example"
          caption={
            <>
              <P>
                The vertices of our recurring example tree, each showing the data that they contribute to the data stream that lets a client incrementally verify the digest of the string <Code>hello_world</Code>.
              </P>
              <P>
                The data to transmit is color-coded to indicate the order; the full stream is: <Sidenote note="The length of the original string in bytes."><Code>11</Code></Sidenote>, <Turbo1><Application fun="lbl" args={["2"]}/></Turbo1>, <Turbo2><Application fun="lbl" args={["9"]}/></Turbo2>, <Turbo3><Application fun="lbl" args={["3"]}/></Turbo3>, <Turbo4><Application fun="lbl" args={["6"]}/></Turbo4>, <Turbo5><Application fun="lbl" args={["4"]}/></Turbo5>, <Turbo6><Application fun="lbl" args={["5"]}/></Turbo6>, <Turbo7><Code>he</Code></Turbo7>, <Turbo8><Code>ll</Code></Turbo8>, <Turbo9><Application fun="lbl" args={["8"]}/></Turbo9>, <Turbo10><Application fun="lbl" args={["8"]}/></Turbo10>, <Turbo11><Code>o_</Code></Turbo11>, <Turbo12><Code>wo</Code></Turbo12>, <Turbo13><Application fun="lbl" args={["10"]}/></Turbo13>, <Turbo14><Application fun="lbl" args={["11"]}/></Turbo14>, <Turbo15><Code>rl</Code></Turbo15>, <Turbo16><Code>d</Code></Turbo16>.
              </P>
              <P>
                Listing the vertices in the order in which they contribute their child labels or chunks is instructive: <M post=".">1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11</M> Can you spot the pattern?
              </P>
            </>
          }
        >
          <Img
            src={<ResolveAsset asset={["graphics", "example_full_stream.svg"]} />}
            alt="A visualization of the Merkle tree for the string *hello_world*, listing in each vertex the data that that vertex contributes to the verified data stream."
          />
        </Fig>
      </Hsection>

      <Hsection n="slice_verification" title="Slice Verification">
        <P>

        </P>
      </Hsection>

      <Hsection n="details" title="Details">
        <P>
          <Alj inline>TODO justify: chunks instead of individual bytes, chunk offset in hash_chunk, is_root flag in hash_chunk and hash_inner, lenght in (each) hash_inner, choice of merkle dag.</Alj>
        </P>
      </Hsection>
    </Hsection>

    <Hsection n="optimizations" title="Optimizations">
      <P>
        <Alj inline>TODO</Alj>
      </P>
    </Hsection>

    <Hr/>
    <Alj inline>older draft text below.</Alj>


    <Hsection n="requests" title="Requests and Verifiable Responses">
        <P>
          We now describe the various requests that a client in a Bao-based content-addressable storage system can issue and for which a server can supply verifiable responses.
        </P>

        <Hsection n="sec_batch_get" title="Batch Get Requests">
          <PreviewScope>
            <P>
              A <DefType n="batch_get" r="BatchGet"/> request consists of a single Bab digest, and asks for a string that hashes to that digest. The server can issue two valid responses: either a reply to indicate that the server does not have a corresponding string, or the full string. The client can verify a succesful response by hashing the received string and asserting that it hashes to the original digest.
            </P>
          </PreviewScope>

          <P>
            <Rb n="batch_get"/> requests are not specific to Bab, they work with arbitrary secure hash functions. The problem is that any partial response is worthless, since the client cannot verify any data. <Rb n="batch_get"/> requests are notable for their efficiency, however: the response includes no verification metadata. We will later develop a <R n="sec_dynamic_streaming">request type</R> that lets clients specify how much untrusted data they are willing to buffer; for sufficiently large buffer capacity, such requests become equivalent to <R n="batch_get"/> requests.
          </P>
        </Hsection>

        <Hsection n="sec_length" title="Length Requests">
          <PreviewScope>
            <P>
              A <DefType n="length" r="Length"/> request consists of a single Bab digest, and asks for the length of a string that hashes to that digest.<Marginale>Bao, unlike Bab, can certify a length only by transmitting the full string.</Marginale> The server can issue two valid responses: either a reply to indicate that the server does not know of a corresponding string, or the length of the string, followed by a length proof. If the length is less than or equal to <R n="chunk_size"/>, the length proof is simply the string itself, verifiable by the client by hashing the string and asserting that it hashes to the original digest. If the length is greater than <R n="chunk_size"/>, then the corresponding Merkle tree has an inner vertex as a root. The length proof then consists of the labels of the left and the right child of the root vertex. The client verifies this proof by asserting that <Application fun="hash_inner" args={[
                <DefValue n="length_left" r="left"/>,
                <DefValue n="length_right" r="right"/>,
                <DefValue n="length_len" r="len"/>,
                "true",
              ]}/> is equal to the original digest.
            </P>
          </PreviewScope>
        </Hsection>

        <Hsection n="sec_simple_streaming" title="Simple Get Requests">
          <PreviewScope>
            <P>
              A <DefType n="simple_streaming_get" r="SimpleStreamingGet"/> request consists of a single Bab digest, and asks for a string that hashes to that digest, as well as interleaved verification metadata that allows verifying that the stream of incoming string data does indeed prefix the requested string.<Marginale>A response to a <R n="simple_streaming_get"/> request corresponds to the notion of the <A href="https://github.com/oconnor663/bao/blob/master/docs/spec.md#combined-encoding-format">combined encoding format</A> of Bao.</Marginale>
            </P>

            <P>
              A successful response consists of the length of the payload in bytes, followed by the result of performing a depth-first traversal of the string’s Merkle tree (visiting left children before right children), and emitting for each inner vertex the label of its left child followed by the label of its right child, and for each leaf vertex emitting the corresponding chunk. The client can verify the response by reconstructing all labels of the Merkle tree and asserting that all labels match the transmitted values — or the original digest, in case of the root.<Alj>TODO: add example, also mention buffering of trusted data</Alj>
            </P>
          </PreviewScope>

          <P>
            <Rb n="simple_streaming_get"/> requests correctly implement the core feature of Bab — verified streaming. But they do so in a rather naïve way: whenever the label of a left child is emitted, that data is followed almost immediately by enough further data to compute that label from scratch. So why transmit it in the first place? Skipping the label of a left child means that the client needs to buffer the label of the right child without being able to verify it until the left child has been reconstructed. The response to a <R n="simple_streaming_get"/> request minimizes the buffering of unverified data. If the client commits to buffering up to a certain amount of unverified data, then we can define a response stream that gets to omit some labels.
          </P>

          <P>
            The <R n="chunk_size"/> used by <Sidenote note={<>Or <M post=",">2 \cdot <R n="width"/></M> whichever is greater. Typically, the <R n="chunk_size"/> is significantly greater.</>}>Bab</Sidenote> serves as a lower bound of how much untrusted data peers must already be willing to buffer (because a chunk can only be verified once <Em>all</Em> of its bytes were received). Hence, it makes sense to allow at least as much buffering of unverified metadata. <Rb n="william3"/> (and hence also Blake3-based Bao) has a <R n="chunk_size"/> of 1024 bytes, and a <R n="width"/> of 32 bytes. This means that clients can reconstruct all but one out of <M><MFrac num="1024" de="32"/> = 32</M> left labels without increasing the length of the longest possible sequences of unverified data to buffer. For each of those 32 left labels, the right label must also be transmitted, so the total amount of all verification metadata is reduced to <M><MFrac num="32 + 1" de="32 + 32"/> = <MFrac num="33" de="64"/> \approx <MFrac num="1" de="2"/></M>. In Bao (or with <R n="simple_streaming_get"/> requests for <R n="william3"/>), the overhead of verfication metadata is roughly 3.125%. A more sophisticated response format that skips 31 out of 32 left labels brings the overhead down to roughly 1.611%.
          </P>

          <P>
            If a client is willing to buffer even more unverified metadata than just the <R n="chunk_size"/>, then the response can omit some right labels as well. As an intuitive extreme, consider a client willing to buffer a number of unverified bytes equal to the length of the requested string. In that case, the server can omit <Em>all</Em> verification metadata — the client simply reconstructs all tree labels from the raw chunk data.
          </P>

          <P>
            We now give a precise definition of minimal responses to streaming requests from a client that is willing to buffer a particular, fixed amount of unverified bytes. The computations are not immediately obvious, but not terribly complicated either.
          </P>
        </Hsection>

        <Hsection n="sec_dynamic_streaming" title="Dynamic Get Requests">
          <PreviewScope>
            <P>
              A <DefType n="dynamic_streaming_get" r="DynamicStreamingGet"/> request consists of a Bab digest, and a number of bytes of data that the client is willing to buffer<Marginale>If the buffer capacity is zero, the <R n="dynamic_streaming_get"/> request is equivalent to a <R n="simple_streaming_get"/> request. If the capacity is <M>2^<Curly>64</Curly> - 1</M>, the <R n="dynamic_streaming_get"/> request is equivalent to a <R n="batch_get"/> request.</Marginale> without being able to verify them. A successful response stream is similar to the response stream to a <R n="simple_streaming_get"/> request, but with omissions as defined below. The client can verify the response by reconstructing all labels of the Merkle tree and asserting that all labels match the transmitted values — or the original digest, in case of the root.
            </P>
          </PreviewScope>

          <P>
            We now give a pseudocode function that assigns to every inner vertex of the Merkle tree whether the labels of its left and right children should be emitted into the response stream or not.
          </P>

          <Pseudocode n="code_include_labels" lineNumbering>
            <FunctionItemUntyped
              comment={<>Call <R n="include_labels"/> with the root of the tree as the first argument and the buffer capacity for unverified data as both the second and third argument. The function then sets <Code>include_left_lbl</Code> and <Code>include_right_lbl</Code> fields on <Em>each</Em> vertex in the tree that indicate which child labels the vertex contributes to the response stream.</>}
              id={"include_labels"}
              args={[
                ["v", "lbls_v"],
                ["available", "lbls_av"],
                ["max", "lbls_max"],
              ]}
              body={[
                <>
                  <If
                    cond={<>
                      <R n="lbls_av"/> <Gte/> <ApplicationRaw fun="leaves" args={[
                        <Access at="left"><R n="lbls_v"/></Access>]}
                      /> * <R n="chunk_size"/> + <R n="width"/>
                    </>}
                    body={[
                      {
                        commented: {
                          comment: <>
                            We have sufficient available capacity to send all <Rs n="chunk"/> of the left subtree without any verification metadata. Mark all vertices in the left subtree as not including their labels, also mark the current left label.
                          </>,
                          segment: <ApplicationRaw fun="skip_all_labels" args={[<Access at="left"><R n="lbls_v"/></Access>]}/>,
                          dedicatedLine: true,
                        }
                      },
                      <AssignRaw lhs={<Access at="include_left_lbl"><R n="lbls_v"/></Access>}>false</AssignRaw>,
                      <AssignRaw op="-=" lhs={<R n="lbls_av"/>}>
                        <ApplicationRaw fun="leaves" args={[
                          <Access at="left"><R n="lbls_v"/></Access>]}
                        /> * <R n="chunk_size"/> + <R n="width"/>
                      </AssignRaw>,
                      "",
                      {
                        commented: {
                          comment: <>
                            Can we skip our right label as well?
                          </>,
                          segment: <>
                            <If cond={
                              <><R n="lbls_av"/> <Gte/> <R n="width"/></>
                            } body={[
                              <AssignRaw lhs={<Access at="include_right_lbl"><R n="lbls_v"/></Access>}>false</AssignRaw>,
                              <AssignRaw op="-=" lhs={<R n="lbls_av"/>}><R n="width"/></AssignRaw>,
                            ]}/> <Else body={[
                              <AssignRaw lhs={<Access at="include_right_lbl"><R n="lbls_v"/></Access>}>true</AssignRaw>,
                              <AssignRaw lhs={<R n="lbls_av"/>}><R n="lbls_max"/></AssignRaw>,
                            ]}/>
                          </>,
                          dedicatedLine: true,
                        }
                      },
                      "",
                      {
                        commented: {
                          comment: "Recursively process the right child with the remaining capacity.",
                          segment: <Application fun="include_labels" args={[
                            <Access at="right"><R n="lbls_v"/></Access>,
                            <R n="lbls_av"/>,
                            <R n="lbls_max"/>,
                          ]}/>,
                          dedicatedLine: true,
                        }
                      },                      
                    ]}
                  /> <Else body={[
                    {
                      commented: {
                        comment: <>
                          We cannot omit all labels for the left subtree. We include the label of our right child, so that the left subtree becomes verifiable as soon as possible. For our right subtree, we can hence start with full buffer capacity again.
                        </>,
                        segment: <AssignRaw lhs={<Access at="include_right_lbl"><R n="lbls_v"/></Access>}>true</AssignRaw>,
                        dedicatedLine: true,
                      }
                    },
                    <Application fun="include_labels" args={[
                      <Access at="right"><R n="lbls_v"/></Access>,
                      <R n="lbls_max"/>,
                      <R n="lbls_max"/>,
                    ]}/>,
                    "",
                    {
                      commented: {
                        comment: <>
                          Can we at least skip <Em>our</Em> left label?
                        </>,
                        segment: <>
                          <If cond={
                            <><R n="lbls_av"/> <Gte/> <R n="width"/></>
                          } body={[
                            <AssignRaw lhs={<Access at="include_left_lbl"><R n="lbls_v"/></Access>}>false</AssignRaw>,
                            <AssignRaw op="-=" lhs={<R n="lbls_av"/>}><R n="width"/></AssignRaw>,
                          ]}/> <Else body={[
                            <AssignRaw lhs={<Access at="include_left_lbl"><R n="lbls_v"/></Access>}>true</AssignRaw>,
                            <AssignRaw lhs={<R n="lbls_av"/>}><R n="lbls_max"/></AssignRaw>,
                          ]}/>
                        </>,
                        dedicatedLine: true,
                      }
                    },
                    "",
                      {
                        commented: {
                          comment: "Recursively process the left child with the remaining capacity.",
                          segment: <Application fun="include_labels" args={[
                            <Access at="left"><R n="lbls_v"/></Access>,
                            <R n="lbls_av"/>,
                            <R n="lbls_max"/>,
                          ]}/>,
                          dedicatedLine: true,
                        }
                      },
                  ]}/>
                </>,
              ]}
            />
          </Pseudocode>

          <P>
            <Alj inline>TODO: example</Alj>
          </P>

          <P>
            An interesting special case of <R n="include_labels"/> is that of <R n="lbls_max"/> being equal to <M post="."><R n="chunk_size"/> + <R n="width"/></M> The function becomes significantly more simple: all right child labels are be emitted, and the left child label of some inner vertex is emitted if and only if the distance between the vertex and its leftmost leaf descendent is one greater than a number divisible by <M post="."><MFrac de={<R n="width"/>} num={<R n="chunk_size"/>}/></M>
          </P>

          <P>
            <Alj inline>TODO: example</Alj>
          </P>

          <P>
            Given the existence of such special cases, it can make sense to statically specify a buffering capacity for all participants in a system, and then apply that capacity to all requests, as described next.
          </P>
        </Hsection>

        <Hsection n="sec_static_streaming" title="Static Get Requests">
          <PreviewScope>
            <P>
              A <DefType n="static_streaming_get" r="StaticStreamingGet"/> request consists of a single Bab digest, and the valid responses are exactly those of a <R n="dynamic_streaming_get"/> for the same digest and some statically fixed, well-known buffer capacity.
            </P>
          </PreviewScope>

          <P>
            If the only <Code>get</Code> requests in a system are <R n="static_streaming_get"/> requests, then participants know in advance which tree labels will never be sent. They can forego storing those labels altogether, without loosing any performance.
          </P>
        </Hsection>

        <Hsection n="sec_simple_slice" title="Simple Slice Requests">
          <P>
            Beyond verified streaming of full strings, the Merkle tree also enables verified srteaming of arbitrary slices. To introduce slice requests, we ignore buffering optimizations for a bit.
          </P>

          <PreviewScope>
            <P>
              A <DefType n="simple_slice" r="SimpleSlice"/> request consists of a Bab digest, the offset of the first chunk to request (an unsigned 64-bit integer), and the number of chunks in the slice (a natural number between <M>1</M> and <M>2^<Curly>64</Curly> - 1</M>, both inclusive). It asks for the corresponding substring of a string that hashes to the given digest, as well as interleaved verification metadata that allows verifying that the stream of incoming string data does indeed belong to that string.
            </P>

            <P>
              There are three possible responses. First, the server can indicate that it does not have the requested data. Second, it can indicate that the slice is invalid (the sum of the offset and the length is greater than the length of the string divided by <R n="chunk_size"/>), in which case the response is identical to a successful response to a <R n="length"/> request.
              If neither of these is the case, then the response consists of chunk data and verification metadata. The data to transmit is identical to that of a successful response to a <R n="simple_streaming_get"/> request, except that all metadata emitted by a Merkle tree node that does not lie on a path from the root to any of the chunks in the slice is omitted.
            </P>
          </PreviewScope>

          <P>
            <Alj inline>TODO: example</Alj>
          </P>

          <P>
            When a client makes a slice request in a string for which it has already made prior slice requests, then the verification metadata of those old requests might overlap with the verification metadata for the new request. Ideally, the client should be able to compactly communicate already-available metadata to the server, so that it can be omitted from the response.
          </P>

          <P>
            The metadata for any request consist of the inner nodes on all paths from the root to the requested chunks. Hence, the metadata for two non-overlapping chunks might overlap towards the root of the tree, but diverges towards the leaves (see <Rc n="fig_slice_meta"/>). This enables the client to compactly communicate which data the server can skip: for the paths from the root to the leftmost and rightmost chunk of the requested slice respectively, the client can supply the number of vertices whose emitted metadata to omit.
          </P>
        </Hsection>

        <Hsection n="sec_pruned_slice" title="Pruned Slice Requests">
          <PreviewScope>
            <P>
              A <DefType n="pruned_slice" r="PrunedSlice"/> request consists of a Bab digest, the offset of the first chunk to request (an unsigned 64-bit integer), the number of chunks in the slice (a natural number between <M>1</M> and <M>2^<Curly>64</Curly> - 1</M>, both inclusive), a number of vertices to skip on the path from the root to the first requested chunk (between 0 and 64), and a number of vertices to skip on the path from the root to the final requested chunk (between 0 and 64). It asks for the corresponding substring of a string that hashes to the given digest, as well as interleaved verification metadata that allows verifying that the stream of incoming string data does indeed belong to that string, assuming that the metadata for the indicated vertices is already available.
            </P>

            <P>
              The response options to a <R n="pruned_slice"/> request are those of the response options to the corresponding <R n="simple_slice"/> request, except in a successful response, all the metadata emitted by any vertex that is amongst the first indicated vertices on the path from the root to either the first or the final chunk is omitted.<Alj>TODO: improve the wording. Give names to the offsets to skip.</Alj> 
            </P>
          </PreviewScope>

          <P>
            <Alj inline>TODO: example</Alj>
          </P>
        </Hsection>

        <Hsection n="sec_dynamic_slice" title="Dynamic Pruned Slice Requests">
          <PreviewScope>
            <P>
              A <DefType n="dynamic_pruned_slice" r="DynamicPrunedSlice"/> requests combine pruned slice requests with a dynamically supplied amount of buffer space for unverified data. Determining which metadata to skip requires its own algorithm, modified from <R n="include_labels"/>.<Alj inline> TODO properly write this section, write down the algorithm.</Alj>
            </P>
          </PreviewScope>

          <P>
            Note that the <R n="dynamic_pruned_slice"/> are expressive enough to encompass every single type of request we have defined.
          </P>
        </Hsection>

        <Hsection n="sec_static_slice" title="Static Pruned Slice Requests">
          <P>
            <Alj inline>TODO: write this</Alj>
          </P>
        </Hsection>
    </Hsection>

    <Hsection title="References" n="bibliography" noNumbering>
      <Bibliography />
    </Hsection>
  </ArticleTemplate>
);

// Evaluate the expression. This has exciting side-effects,
// like creating a directory that contains a website!
ctx.evaluate(exp);
