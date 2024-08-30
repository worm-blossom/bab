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
import { Access, ApplicationRaw, Assign, AssignRaw, Blockquote, CommentLine, DefField, DefFunction, DefType, Div, FunctionItemUntyped, Gte, Hr, Rb } from "../deps.ts";
import { VisualizeVerification } from "./macros.tsx";

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

const exampleBoxes = [
  {isChunk: false, content: "1", x: 0, y: 0, children: [2, 9]},
  {isChunk: false, content: "2", x: -2, y: 1, children: [3, 6]}, {isChunk: false, content: "9", x: 2, y: 1, children: [10, 11]},
  {isChunk: false, content: "3", x: -3, y: 2, children: [4, 5]}, {isChunk: false, content: "6", x: -1, y: 2, children: [7, 8]},
  {isChunk: false, content: "4", x: -3.5, y: 3, children: [4]}, {isChunk: false, content: "5", x: -2.5, y: 3, children: [5]},
  {isChunk: true, content: "he", x: -3.5, y: 3, children: []},
  {isChunk: true, content: "ll", x: -2.5, y: 3, children: []},
  {isChunk: false, content: "7", x: -1.5, y: 3, children: [7]}, {isChunk: false, content: "8", x: -0.5, y: 3, children: [8]},
  {isChunk: true, content: "o_", x: -1.5, y: 3, children: []},
  {isChunk: true, content: "wo", x: -0.5, y: 3, children: []},
  {isChunk: false, content: "10", x: 1, y: 2, children: [10]}, {isChunk: false, content: "11", x: 3, y: 2, children: [11]},
  {isChunk: true, content: "rl", x: 1, y: 2, children: []},
  {isChunk: true, content: "d", x: 3, y: 2, children: []},
];

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
        When strings are hashed with Bab, servers embed into the data stream efficiently verifiable proofs that the data they have sent so far is indeed part of the requested string. More specifically, Bab enables the following features (all of which will be explained in detail in <Rc n="rationale"/>):
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
            It must be a function that maps a <R n="chunk"/> and a boolean flag (whether the node is the root node or not) to a bytestring of <R n="width"/> bytes.
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
            If <R n="lblv"/> is a leaf vertex corresponding to some <R n="chunk"/> <DefValue n="lbl_leaf_c" r="c"/>, then <Application fun="lbl" args={[<R n="lblv"/>]}/> is <Application fun="hash_chunk" args={[<R n="lbl_leaf_c"/>, <M>\top</M>]}/> if <R n="lbl_leaf_c"/> is the <Em>only</Em> <R n="chunk"/> in <R n="chunks"/>, and <Span clazz="nowrap"><Application fun="hash_chunk" args={[<R n="lbl_leaf_c"/>, <M>\bot</M>]}/></Span>, otherwise.
          </P>

          <P>
            If <R n="lblv"/> is an inner vertex, let <DefValue n="lbl_inner_l" r="left"/> denote its left child, let <DefValue n="lbl_inner_r" r="right"/> denote its right child, let <DefValue n="lbl_inner_len" r="len"/> denote the total length of the <Rs n="chunk"/> corresponding to all leaf descendents of <R n="lblv"/>, and let <DefValue n="lbl_inner_is_root" r="is_root"/> be <M>\top</M> if <R n="lblv"/> is the root of the tree and <M>\bot</M> otherwise.
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
          The choice of parameters for using Bab is flexible, but some care needs to be taken to create a secure (i.e., collision-resistant and preimage-resistant) hash function. <R n="hash_chunk"/> and <R n="hash_inner"/> must be secure hash functions themselves, and it must further be impossible to find an input to <R n="hash_chunk"/> and one to <R n="hash_inner"/> such that both yield the same digest. Instantiations may let <R n="hash_inner"/> ignore the length argument without compromising collision-resistance or preimage-resistance, at the cost of losing efficient string length proofs (see <Rc n="length_verification"/> for details).
        </P>

        <P>
          We supply two useful instantiations: one based on arbitrary secure hash functions, and a more efficient one that closely mimics Blake3.
        </P>

        <Hsection n="instantiations_from_secure" title="Via Conventional Hash Functions">
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
              <DefFunction n="william3" r="William3" rb="William3"/> is a Bab instantiation that is almost identical to Blake3. There are only two differences: <R n="william3"/> does not supply chunk indices into the label computation for chunks, and <R n="william3"/> incorporates a length value into the label computation of inner tree vertices. <Rb n="william3"/> has a normal hash mode and a keyed hash mode (based on a 256 bit key); unlike Blake3 it does not support a key derivation mode.
            </P>

            <P>
              <Rb n="william3"/> uses a <R n="chunk_size"/> of 1024 bytes (just like Blake3). Its <R n="width"/> is 32 bytes (just like Blake3).
            </P>

            <P>
              The <R n="hash_chunk"/> function is almost identical to the Blake3 computation of <Em>chunk chaining values</Em>, with a single exception<Marginale>Explained in <Rc n="chunk_indices"/>.</Marginale>: where Blake sets the <Code>t</Code> parameter of its compression function to the chunk index, <R n="william3"/> sets it to 0.
            </P>

            <P>
              The <R n="hash_inner"/> function also is almost identical to the Blake3 computation of <Em>parent node chaining values</Em>, with a single exception<Marginale>Explained in <Rc n="length_verification"/>.</Marginale>: whereas Blake3 sets the <Code>t</Code> parameter of its compression function to 0, <R n="william3"/> sets <Code>t</Code> to the third argument (the length value) of <R n="hash_chunk"/> (as an unsigned <Em>little</Em>-endian 64-bit integer).
            </P>
          </PreviewScope>
        </Hsection>
      </Hsection>
    </Hsection>

    <Hsection n="rationale" title="Design Rationale">
      <P>
        We now explain the decisions that went into the definition of the Bab hash function.<Marginale>Bab is heavily based off Blake3 and Bao, so many of these rationales are restating the design work that went into Blake3 and Bao. Compared to those two, only little creativity went into the design of Bab.</Marginale>
      </P>

      <Hsection n="streaming_verification" title="Streaming Verification">
        <P>
          Using the root label of a Merkle-tree as the digest opens up the option of incrementally verifying a string as it is being received as belonging to the requested hash. To do so, the transmission of each chunk is preceded by the labels of the left and right children of all inner vertices on the path from the root of the tree to that chunk. As an optimization, each label is transmitted at most once; it is the receiver’s responsibility to cache labels until they are not needed for verification any longer. At the very start of the transmission, the length of the string has to be sent. We call this transmission the <Def n="baseline" r="baseline verifiable stream" preview={<>
            <P>
              The <Def fake n="baseline" r="baseline verifiable stream"/> of a string allows for streaming authentication of a get request for a digest. It starts with the length of the requested string, followed by the chunks of the string, where each chunk is preceded by some metadata: the labels of the left and right children of all inner vertices on the path from the root of the tree to that chunk. Each label is transmitted at most once, duplicates are omitted.
            </P>
          </>}/>. <Rcb n="fig_stream"/> visualizes and lists an example:
        </P>

        <Fig
          n="fig_stream"
          // wrapperTagProps={{clazz: "wide"}}
          title="Verifiable Streaming Example"
          caption={
            <>
              <P>
                The vertices of our recurring example tree, each showing the data that they contribute to the <R n="baseline"/> that lets a client incrementally verify the digest of the string <Code>hello_world</Code>.
              </P>
              <P>
                Listing the vertices in the order in which they contribute their child labels or chunks is quite instructive: <M post=".">1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11</M> Can you spot the pattern?
              </P>
            </>
          }
        >
          <P>
            <Sidenote note="The length of the original string in bytes."><Code>11</Code></Sidenote>, <Turbo1><Application fun="lbl" args={["2"]}/></Turbo1>, <Turbo2><Application fun="lbl" args={["9"]}/></Turbo2>, <Turbo3><Application fun="lbl" args={["3"]}/></Turbo3>, <Turbo4><Application fun="lbl" args={["6"]}/></Turbo4>, <Turbo5><Application fun="lbl" args={["4"]}/></Turbo5>, <Turbo6><Application fun="lbl" args={["5"]}/></Turbo6>, <Turbo7><Code>he</Code></Turbo7>, <Turbo8><Code>ll</Code></Turbo8>, <Turbo9><Application fun="lbl" args={["7"]}/></Turbo9>, <Turbo10><Application fun="lbl" args={["8"]}/></Turbo10>, <Turbo11><Code>o_</Code></Turbo11>, <Turbo12><Code>wo</Code></Turbo12>, <Turbo13><Application fun="lbl" args={["10"]}/></Turbo13>, <Turbo14><Application fun="lbl" args={["11"]}/></Turbo14>, <Turbo15><Code>rl</Code></Turbo15>, <Turbo16><Code>d</Code></Turbo16>.
          </P>
          <Img
            src={<ResolveAsset asset={["graphics", "example_full_stream.svg"]} />}
            alt="A visualization of the Merkle tree for the string *hello_world*, listing in each vertex the data that that vertex contributes to the verified data stream."
          />
        </Fig>

        <P>
          The client can verify the stream by eargerly reconstructing the labels of tree nodes and asserting that the computed labels match the received data. You can go through the verification process for the example stream step by step below. Each step consists of reading either a full label or a full chunk from the stream. The graphic shows the Merkle tree and indicates for each node the knowledge that the client has about it: dim if the client has not yet received any data concerning it, diagonally striped orange if the client has received data that it will need later but cannot verify yet, green if it could verify the data and needs to keep it for verification of subsequent data, and gray if it has verified the data and does not need it for any future computation either.
        </P>

        <Div clazz="wide">
          <VisualizeVerification
            slidesId="exVeriDefault"
            compact
            layers={4}
            boxes={exampleBoxes}
            steps={[
              {
                boxStatuses: ["veri", "unve", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss"],
                computations: [{trusted: 1}],
              },
              {
                boxStatuses: ["done", "veri", "veri", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss"],
                computations: [{isChunk: false, resultsIn: 1, left: 2, right: 9, len: 11, isRoot: true}],
              },
              {
                boxStatuses: ["done", "veri", "veri", "unve", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss"],
                computations: [],
              },
              {
                boxStatuses: ["done", "done", "veri", "veri", "veri", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss"],
                computations: [{isChunk: false, resultsIn: 2, left: 3, right: 6, len: 8}],
              },
              {
                boxStatuses: ["done", "done", "veri", "veri", "veri", "unve", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss"],
                computations: [],
              },
              {
                boxStatuses: ["done", "done", "veri", "done", "veri", "veri", "veri", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss"],
                computations: [{isChunk: false, resultsIn: 3, left: 4, right: 5, len: 4}],
              },
              {
                boxStatuses: ["done", "done", "veri", "done", "veri", "done", "veri", "done", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss"],
                computations: [{isChunk: true, index: 4, content: "he"}],
              },
              {
                boxStatuses: ["done", "done", "veri", "done", "veri", "done", "done", "done", "done", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss"],
                computations: [{isChunk: true, index: 5, content: "ll"}],
              },
              {
                boxStatuses: ["done", "done", "veri", "done", "veri", "done", "done", "done", "done", "unve", "miss", "miss", "miss", "miss", "miss", "miss", "miss"],
                computations: [],
              },
              {
                boxStatuses: ["done", "done", "veri", "done", "done", "done", "done", "done", "done", "veri", "veri", "miss", "miss", "miss", "miss", "miss", "miss"],
                computations: [{isChunk: false, resultsIn: 6, left: 7, right: 8, len: 4}],
              },
              {
                boxStatuses: ["done", "done", "veri", "done", "done", "done", "done", "done", "done", "done", "veri", "done", "miss", "miss", "miss", "miss", "miss"],
                computations: [{isChunk: true, index: 6, content: "o_"}],
              },
              {
                boxStatuses: ["done", "done", "veri", "done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "miss", "miss", "miss", "miss"],
                computations: [{isChunk: true, index: 7, content: "wo"}],
              },
              {
                boxStatuses: ["done", "done", "veri", "done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "unve", "miss", "miss", "miss"],
                computations: [],
              },
              {
                boxStatuses: ["done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "veri", "veri", "miss", "miss"],
                computations: [{isChunk: false, resultsIn: 9, left: 10, right: 11, len: 3}],
              },
              {
                boxStatuses: ["done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "veri", "done", "miss"],
                computations: [{isChunk: true, index: 10, content: "rl"}],
              },
              {
                boxStatuses: ["done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "done"],
                computations: [{isChunk: true, index: 11, content: "d"}],
              },
            ]}
          />
        </Div>
      </Hsection>

      <Hsection n="slice_verification" title="Slice Verification">
        <P>
          The Merkle-tree design allows not only for verifiable streaming of the full string, but also of any slice (of chunks) within. Assume a client wants to receive some number of chunks, starting at some chunk offset. The response data is defined with the same technique as for the <R n="baseline"/>: the transmission of each chunk <Em>in the slice</Em> is preceded by the labels of the left and right children of all inner vertices on the path from the root of the tree to that chunk. Chunks outside the slice do not contribute any data. Again, each label is transmitted at most once. Since the length of the slice is known to the client, the response need not be prefixed by the length. <Rcb n="fig_stream_slice"/> shows an example of which data needs to be transmitted when the client requests three chunks, starting at offset two (zero-indexed).
        </P>

        <Fig
          n="fig_stream_slice"
          // wrapperTagProps={{clazz: "wide"}}
          title="Verifiable Slice Streaming Example"
          caption={
            <>
              <P>
                The vertices of our recurring example tree, each showing the data that they contribute to the data stream that lets a client incrementally verify a slice of three chunks, starting at chunk offset two, in the string <Code>hello_world</Code>.
              </P>
              <P>
                The list of vertices in the order in which they contribute their child labels or chunks now has some gaps, but is still strictly ascending: <M post=".">1, 2, 6, 7, 8, 9, 10</M>
              </P>
            </>
          }
        >
          <P>
            <Turbo1><Application fun="lbl" args={["2"]}/></Turbo1>, <Turbo2><Application fun="lbl" args={["9"]}/></Turbo2>, <Turbo3><Application fun="lbl" args={["3"]}/></Turbo3>, <Turbo4><Application fun="lbl" args={["6"]}/></Turbo4>, <Turbo9><Application fun="lbl" args={["7"]}/></Turbo9>, <Turbo10><Application fun="lbl" args={["8"]}/></Turbo10>, <Turbo11><Code>o_</Code></Turbo11>, <Turbo12><Code>wo</Code></Turbo12>, <Turbo13><Application fun="lbl" args={["10"]}/></Turbo13>, <Turbo14><Application fun="lbl" args={["11"]}/></Turbo14>, <Turbo15><Code>rl</Code></Turbo15>.
          </P>
          <Img
            src={<ResolveAsset asset={["graphics", "example_slice_stream.svg"]} />}
            alt="A visualization of the Merkle tree for the string *hello_world*, listing in each vertex the data that that vertex contributes to the verified data stream."
          />
        </Fig>

        <P>
          You can step through this example verification process below:
        </P>

        <Div clazz="wide">
          <VisualizeVerification
            slidesId="exVeriSliceDefault"
            layers={4}
            boxes={exampleBoxes}
            skipping={[5, 6, 7, 8, 16]}
            steps={[
              {
                boxStatuses: ["veri", "unve", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss"],
                computations: [{trusted: 1}],
              },
              {
                boxStatuses: ["done", "veri", "veri", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss"],
                computations: [{isChunk: false, resultsIn: 1, left: 2, right: 9, len: 11, isRoot: true}],
              },
              {
                boxStatuses: ["done", "veri", "veri", "unve", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss"],
                computations: [],
              },
              {
                boxStatuses: ["done", "done", "veri", "done", "veri", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss"],
                computations: [{isChunk: false, resultsIn: 2, left: 3, right: 6, len: 8}],
              },
              {
                boxStatuses: ["done", "done", "veri", "done", "veri", "miss", "miss", "miss", "miss", "unve", "miss", "miss", "miss", "miss", "miss", "miss", "miss"],
                computations: [],
              },
              {
                boxStatuses: ["done", "done", "veri", "done", "done", "miss", "miss", "miss", "miss", "veri", "veri", "miss", "miss", "miss", "miss", "miss", "miss"],
                computations: [{isChunk: false, resultsIn: 6, left: 7, right: 8, len: 4}],
              },
              {
                boxStatuses: ["done", "done", "veri", "done", "done", "miss", "miss", "miss", "miss", "done", "veri", "done", "miss", "miss", "miss", "miss", "miss"],
                computations: [{isChunk: true, index: 7, content: "o_"}],
              },
              {
                boxStatuses: ["done", "done", "veri", "done", "done", "miss", "miss", "miss", "miss", "done", "done", "done", "done", "miss", "miss", "miss", "miss"],
                computations: [{isChunk: true, index: 8, content: "wo"}],
              },
              {
                boxStatuses: ["done", "done", "veri", "done", "done", "miss", "miss", "miss", "miss", "done", "done", "done", "done", "unve", "miss", "miss", "miss"],
                computations: [],
              },
              {
                boxStatuses: ["done", "done", "done", "done", "done", "miss", "miss", "miss", "miss", "done", "done", "done", "done", "veri", "done", "miss", "miss"],
                computations: [{isChunk: false, resultsIn: 9, left: 10, right: 11, len: 3}],
              },
              {
                boxStatuses: ["done", "done", "done", "done", "done", "miss", "miss", "miss", "miss", "done", "done", "done", "done", "done", "done", "done", "miss"],
                computations: [{isChunk: true, index: 10, content: "rl"}],
              },
            ]}
          />
        </Div>
      </Hsection>

      <Hsection n="length_verification" title="Length Verification">
        <P>
          A server can provide a proof of bounded size for the length of any string to a client who already has the digest of that string. If the string fits into a single <R n="chunk"/>, the proof simply is that chunk itself (the client can reconstruct the digest and assert that it matches). If the string is longer than a single <R n="chunk"/>, then the root of the Merkle tree is an inner node. The server can then supply the length of the string together with the labels of the left and right children of the root. The client feeds these into <R n="hash_inner"/> and asserts that the result matches the digest.
        </P>

        <P>
          Blake3 does <Em>not</Em> incorporate lengths into the computation of inner vertex labels. Blake3 still supports length proofs, these consist of the length followed by the same data as a reply to a slice request for only the final chunk. Such a proof always contains at least a full chunk, plus twice the height of the tree in labels; its size is logarithmic in the length of the string. For a moderately short string (say, 4096 bytes), the length proof via Blake3 has a size of <M>8 + 2 \cdot 2 \cdot 32 + 1024 = 1160</M> bytes. A William3 lenght proof, in comparison, requires <M>2 \cdot 32 + 8 = 72</M> bytes, even for longer strings.
        </P>

        <P>
          A Bab instantiation can choose to simply ignore the length argument in <R n="hash_inner"/>. This can simplify the implementation, and comes at the cost of loosing constant-size length proofs. Such an instantiation can still use the same technique as Blake for logarithmically-sized length proofs of supplying the length followed by the verification data for a slice consisting of the final chunk of the string.
        </P>

        <P>
          For length proofs, it technically suffices to factor the length only into the computation of the root label, but ignore it in the computation of non-root inner labels. Bab opts for the slightly more simple specification that does not introduce this special case. Bab can still be instantiated to this effect, however: since <R n="hash_inner"/> takes an <Code>is_root</Code> flag as an argument, an instantiation can choose to only factor the length into the label computation if <Code>is_root</Code> is <Code>true</Code>. William3 incorporates the length into all node primarily for <Sidenote note={<>
            Although it would be possible to implement root-only length-incorporation in a branchless manner: treat <Code>is_root</Code> as a number (either zero or one), and multiply the length with that number before incorporating it. 
          </>}>simplicity</Sidenote>.
        </P>
      </Hsection>

      <Hsection n="why_is_root" title="The is_root Flag">
        <P>
          Both <R n="hash_chunk"/> and <R n="hash_inner"/> take a boolean <Code>is_root</Code> flag as an argument. This flag <Em>must</Em> influence the output to guard against <A href="https://en.wikipedia.org/wiki/Length_extension_attack">length extension attacks</A>. The flag ensures <Bib item="bertoni2014sufficient">final-node separability</Bib> (called <Quotes>subtree-freeness</Quotes> by the Blake3 authors), which prevents length extension attacks.
        </P>
      </Hsection>

      <Hsection n="chunk_indices" title="No Chunk Indices">
        <P>
          Blake3 incorporates the index of each <R n="chunk"/> when computing its label in the Merkle-tree. Bab does not. The authors of Blake3 give a clear justification for why they added chunk indices:<Marginale>See the <A href="https://raw.githubusercontent.com/BLAKE3-team/BLAKE3-specs/master/blake3.pdf#section.7">Blake3 paper, section 7.5</A>.</Marginale>
        </P>

        <Blockquote>
          <P>
            We [...] use the <Code>t</Code> parameter during the input phase, to indicate the chunk number. This means that each chunk has a distinct <Sidenote note={<><Quotes>Chaining Value</Quotes>, their terminology for Merkle-tree labels.</>}>CV</Sidenote> with high probability, even if two chunks have the same input bytes. This is not strictly necessary for security, but it discourages a class of dangerous optimizations.
          </P>

          <P>
            Consider an application that hashes sparse files, which are mostly filled with zeros. The majority of this application’s input chunks could be the all-zero chunk. This application might try to compute the CV of the zero chunk only once, and then check each chunk before compressing it to see whether it can use that precomputed CV. This check is cheap, and for this application it could be a big speedup. But this optimization is dangerous, because it is not constant-time. The runtime of the hash function would leak information about its input.
          </P>

          <P>
            If tricks like this were possible, an unsafe implementation would inevitably find its way into some privacy-sensitive use case. By distinguishing each chunk, BLAKE3 deliberately sabotages these tricks, in the hopes of keeping every implementation constant-time.
          </P>
        </Blockquote>

        <P>
          Bab is decidedly <Em>not</Em> a general-purpose hash function. It has no ambition to be used as a building block in, say, a digital signature scheme. Hence, we see little value in adding complexity just to deter a certain class of implementation techniques.
        </P>
      </Hsection>

      <Hsection n="binary_tree" title="Binary Tree">
        <P>
          Binary trees are not the only candidate digraphs as the merkelization backbone. Some other candidate constructions include ternary trees (which are more efficient than binary trees <A href="https://en.wikipedia.org/wiki/Optimal_radix_choice#Ternary_tree_efficiency">in some applications</A>), and <A href="https://aljoscha-meyer.de/reed/">efficient binary linking schemes</A>. However, for verified streaming, binary trees turn out to be more efficient.
        </P>

        <P>
          Interestingly enough, the humble linked list, aka hash chain, has some intriguing properties. If the Merkle-DAG was a linked list where the label of the second chunk incorporates the label of the first chunk, the label of the third chunk that of the second, and so on, verified streaming could be done without sending <Em>any</Em> internal labels — by sending chunks in reverse order. Unfortunately, the worst-case size of slice verification proofs would be linear in the size of the tree. This dilemma is similar to that encountered in <A href="https://aljoscha-meyer.de/reed/assets/references/meyer2023sok.pdf">secure timestamping and related problems</A>. Secure relative timestamping solves a more difficult problem than verified streaming, hence its solution are less efficient than a simple binary Merkle tree.
        </P>

        <P>
          Also note that the Merkle tree structure allows for easy parallelization of hash computation, whereas a linked list (or any linking scheme) completely precludes parallelization.
        </P>
      </Hsection>

      <Hsection n="chunk_size_concerns" title="Parameterized Chunk Size">
        <P>
          Bab leaves the <R n="chunk_size"/> as a freely choosable parameter, because different values incur different tradeoffs. At the most basic, a larger <R n="chunk_size"/> shrinks the Merkle tree and thus reduces the metadata overhead in verified streaming, but it also increases the amount of data that needs to be read in sequence without being able to verify it immediately. The <R n="chunk_size"/> also serves as an upper bound to the size of proofs of string length in Bab. Finally, the chunk size also affects the performance of computing strings, see the discussion in <A href="https://raw.githubusercontent.com/BLAKE3-team/BLAKE3-specs/master/blake3.pdf#section.7">Section 7.1 of the Blake3 paper</A>.
        </P>
      </Hsection>
    </Hsection>

    <Hsection n="optimizations" title="Optimized Streaming Verification">
      <P>
        The <R n="baseline"/> imposes a certain overhead compared to transmitting a raw string. When instantiating with a <R n="width"/> of 32 bytes and a <R n="chunk_size"/> of 1024 bytes (like Blake3 and <R n="william3"/>), roughly 3.125% of streaming data is metadata. This is already a fairly low overhead, but it turns out we can do better.
      </P>

      <P>
        There are certain redundancies in how streaming verification works. Consider again <Rc n="fig_stream"/>, where the stream starts with (<Application fun="lbl" args={["2"]}/>, <Application fun="lbl" args={["9"]}/>, <Application fun="lbl" args={["3"]}/>, <Application fun="lbl" args={["6"]}/>, …). <Application fun="lbl" args={["2"]}/> can be computed from <Application fun="lbl" args={["3"]}/> and <Application fun="lbl" args={["6"]}/>, and both of those are transmitted. So why transmit the redundant <Application fun="lbl" args={["2"]}/>?
      </P>

      <P>
        Technically, <Em>all</Em> label transmissions are redundant: if the server sends only the chunks (i.e., simply the string itself), the client can successfully reconstruct the digest, after all. The difference lies in the length of the longest consecutive sequence of bytes that the client receives without being able to verify. When sending only the raw string, that sequence is simply all of the string but its final byte. The <R n="baseline"/> minimizes the length of the longest unverifiable sequence. A scheme that skips <Application fun="lbl" args={["2"]}/> sits between the two <Sidenote note={<>Or at least it <Em>appears</Em> to do so at first glance.</>}>extremes</Sidenote>. We now examine in detail the notion of unverifiable subsequences in a verification data stream, and how to leverage it for efficiency gains.
      </P>

      <Hsection n="unverifiable_sequences" title="Unverifiable Sequences">
        <PreviewScope>
          <P>
            When receiving a string interleaved with verification metadata, we call a transmitted label <Def n="verified"/> if it is the root <Sidenote note="We assume that the client trusts the digest it uses for a request.">label</Sidenote>, or if it and its sibling label have been fed into <R n="hash_inner"/>, yielded the label of the parent vertex, and the parent label has also been <R n="verified"/>. We call a <R n="chunk"/> <Def fake n="verified"/> if it has been fed into <R n="hash_chunk"/>, yielded the label of the vertex corresponding to the <R n="chunk"/>, and that label has also been <R n="verified"/>.
          </P>
        </PreviewScope>

        <PreviewScope>
          <P>
            An <Def n="unverifiable_seq" r="unverifiable sequence" rs="unverifiable sequences"/> is a sequence of consecutive bytes in a response stream whose corresponding labels and chunks cannot yet be <R n="verified"/>. A maximal such sequence in a stream is called a <Def n="mus" r="MUS" rs="MUSs">maximal unverifiable sequence</Def> (<Def fake n="mus" r="MUS"/>). We call the length of the <R n="mus"/> of a stream its <Def n="delay" r="verification delay"/>.
          </P>
        </PreviewScope>

        <P>
          What are the <Rs n="unverifiable_seq"/> in a stream? Any partially transmitted label is unverifiable. Further, a label of a left child is unverifiable without the corresponding label of the right child. Since these are always transmitted in succession, the longest <Rs n="unverifiable_seq"/> contributed by labels have length <M post=".">2 \cdot <R n="width"/> - 1</M> <Rsb n="chunk"/> can only be verified when their final byte gets received, so they contribute <Rs n="unverifiable_seq"/> of length <M post="."><R n="chunk_size"/> - 1</M>
        </P>

        <P>
          This puts the <R n="delay"/> of the <R n="baseline"/> at the maximum of <M>2 \cdot <R n="width"/> - 1</M> and <M post="."><R n="chunk_size"/> - 1</M> In most practical instantiations, the <R n="chunk_size"/> should <Sidenote note={<>
            Blake3 and <R n="william3"/>, for example, have a <R n="width"/> of 32 bytes and a <R n="chunk_size"/> of 1024 bytes.  
          </>}>dominate</Sidenote>. For the remainder of this document, we will assume that <M post=","><R n="chunk_size"/> \geq 2 \cdot <R n="width"/></M> yielding a <R n="delay"/> of the <R n="baseline"/> of <M post="."><R n="chunk_size"/> - 1</M>
        </P>

        <P>
          The <R n="delay"/> gives an upper bound of how much progress is lost if a connection failure occurs in the worst possible moment. It also gives the greatest amount of untrusted data that a client has to buffer in memory <Sidenote note={<>
            This number is one greater than the <R n="delay"/>, because the final byte also needs to be loaded into memory for verification. Verification of <Rs n="chunk"/> might not require holding the full <R n="chunk"/> in memory, but we assume that the client requested the data for a reason, and thus has to hold on to it even if not strictly necessary for verification alone.
          </>}>simultaneously</Sidenote>. Note that this required buffer capacity is mostly independent from the memory that the client needs for buffering <R n="verified"/> labels for reuse in later assertions. Every label of a right child needs to be kept in memory after verification, in order to verify the labels of <Em>its</Em> two children. Hence, verification always requires the capacity to buffer one label per layer of the Merkle-tree (see <A href="#exVeriDefault_5">this example</A>).
        </P>
      </Hsection>

      <Hsection n="left_label_omission" title="Omitting Left Labels">
        
      </Hsection>

      <P>
        <Alj inline>TODO</Alj>
      </P>

      

        {/* <Fig
          n="fig_buffering_free"
          wrapperTagProps={{clazz: "wide"}}
          title="TODO"
          caption={
            <>
              <P>
                TODO
              </P>
            </>
          }
        >
          <VisualizeVerification
            compact
            boxes={[
              {isChunk: false, content: "9"},
              {isChunk: false, content: "6"},
              {isChunk: false, content: "4"},
              {isChunk: false, content: "5"},
              {isChunk: true, content: "he"},
              {isChunk: true, content: "ll"},
              {isChunk: false, content: "7"},
              {isChunk: false, content: "8"},
              {isChunk: true, content: "o_"},
              {isChunk: true, content: "wo"},
              {isChunk: false, content: "10"},
              {isChunk: false, content: "11"},
              {isChunk: true, content: "rl"},
              {isChunk: true, content: "d"},
            ]}
            states={[
              ["unve", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss"],
              ["unve", "unve", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss"],
              ["unve", "unve", "unve", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss"],
              ["veri", "veri", "veri", "veri", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss"],
              ["veri", "veri", "done", "veri", "done", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss"],
              ["veri", "veri", "done", "done", "done", "done", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss"],
              ["veri", "veri", "done", "done", "done", "done", "unve", "miss", "miss", "miss", "miss", "miss", "miss", "miss"],
              ["veri", "done", "done", "done", "done", "done", "veri", "veri", "miss", "miss", "miss", "miss", "miss", "miss"],
              ["veri", "done", "done", "done", "done", "done", "done", "unve", "done", "miss", "miss", "miss", "miss", "miss"],
              ["veri", "done", "done", "done", "done", "done", "done", "done", "done", "done", "miss", "miss", "miss", "miss"],
              ["veri", "done", "done", "done", "done", "done", "done", "done", "done", "done", "unve", "miss", "miss", "miss"],
              ["done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "veri", "veri", "miss", "miss"],
              ["done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "veri", "done", "miss"],
              ["done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "done"],
            ]}
          />
        </Fig>

        <Fig
          n="fig_buffering_group2"
          wrapperTagProps={{clazz: "wide"}}
          title="TODO"
          caption={
            <>
              <P>
                TODO
              </P>
            </>
          }
        >
          <VisualizeVerification
            boxes={[
              {isChunk: false, content: "9"},
              {isChunk: false, content: "3"},
              {isChunk: false, content: "6"},
              {isChunk: true, content: "he"},
              {isChunk: true, content: "ll"},
              {isChunk: true, content: "o_"},
              {isChunk: true, content: "wo"},
              {isChunk: true, content: "rl"},
              {isChunk: true, content: "d"},
            ]}
            states={[
              ["unve", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss"],
              ["unve", "unve", "miss", "miss", "miss", "miss", "miss", "miss", "miss"],
              ["veri", "veri", "veri", "miss", "miss", "miss", "miss", "miss", "miss"],
              ["veri", "veri", "veri", "unve", "miss", "miss", "miss", "miss", "miss"],
              ["veri", "done", "veri", "done", "done", "miss", "miss", "miss", "miss"],
              ["veri", "done", "veri", "done", "done", "unve", "miss", "miss", "miss"],
              ["veri", "done", "done", "done", "done", "done", "done", "miss", "miss"],
              ["veri", "done", "done", "done", "done", "done", "done", "unve", "miss"],
              ["done", "done", "done", "done", "done", "done", "done", "done", "done"],
            ]}
          />
        </Fig> */}


        {/* <VisualizeVerification
            boxes={[
              {isChunk: false, content: "2"}, {isChunk: false, content: "9"},
              {isChunk: false, content: "3"}, {isChunk: false, content: "6"},
              {isChunk: false, content: "7"}, {isChunk: false, content: "8"},
              {isChunk: true, content: "o_"},
              {isChunk: true, content: "wo"},
              {isChunk: false, content: "10"}, {isChunk: false, content: "11"},
              {isChunk: true, content: "rl"},
            ]}
            states={[
              ["unve", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss"],
              ["veri", "veri", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss"],
              ["done", "veri", "unve", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss"],
              ["done", "veri", "done", "veri", "miss", "miss", "miss", "miss", "miss", "miss", "miss"],
              ["done", "veri", "done", "veri", "unve", "miss", "miss", "miss", "miss", "miss", "miss"],
              ["done", "veri", "done", "done", "veri", "veri", "miss", "miss", "miss", "miss", "miss"],
              ["done", "veri", "done", "done", "done", "veri", "done", "miss", "miss", "miss", "miss"],
              ["done", "veri", "done", "done", "done", "done", "done", "done", "miss", "miss", "miss"],
              ["done", "veri", "done", "done", "done", "done", "done", "done", "unve", "miss", "miss"],
              ["done", "done", "done", "done", "done", "done", "done", "done", "veri", "done", "miss"],
              ["done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "done"],
            ]}
          /> */}
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
