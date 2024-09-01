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
import { Access, ApplicationRaw, Assign, AssignRaw, Blockquote, CommentLine, DefField, DefFunction, DefType, Div, FunctionItemUntyped, Gte, Hr, Rb, Strong } from "../deps.ts";
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
          Bab is a family of <A href="https://en.wikipedia.org/wiki/Cryptographic_hash_function">secure hash functions</A>, heavily inspired by <A href="https://github.com/BLAKE3-team/BLAKE3/">BLAKE3</A>. Bab hashes allow for streaming verification of strings, similar to the BLAKE3-based <A href="https://github.com/oconnor663/bao">Bao</A> algorithm. We discuss several optimization techniques that go beyond the Bao specification. Further, unlike BLAKE3 and Bao, Bab digests allow for constant-sized length proofs of their strings.
        </P>
      </>
    }
    authors={[
      {
        name: <A href="https://aljoscha-meyer.de/">Aljoscha Meyer</A>,
        email: <A href="https://github.com/AljoschaMeyer/bab">https://github.com/AljoschaMeyer/bab</A>,
      },
    ]}
  >
    <P>
      <Strong>Status: still a draft, the specification might change. The writeup is in a good shape already, however.</Strong>
    </P>

    <Hsection n="introduction" title="Introduction">
      <P>
        <A href="https://en.wikipedia.org/wiki/Content-addressable_storage">Content-addressable storage</A> lets users refer to strings (files) by a secure hash. Bab is a specification for a hash function specifically designed for usage in peer-to-peer content-addressable storage systems.
      </P>

      <P>
        The key feature of Bab is streaming verification of a string: as a program reads a string, it can verify at regular intervals that the prefix read so far is indeed part of a string hashing to some target digest. Content-addressed storage systems without this feature face a problem in byzantine environments. Suppose a client requests the string corresponding to some digest. The server replies with some data, but the connection is interrupted before the full string was transfered. What should the client do?
      </P>

      <P>
        It could store the data it received, and could later issue a request for the same string, resuming at the correct offset. But that request will fail if the orginal server fed it garbage, and the client will be unable to tell which of its two communication partners acted maliciously. Further, the server might have sent it data that is illegal to store. Hence, a careful client should not persist incomplete data. But this makes it unlikely to successfully receive large strings over an unreliable network.
      </P>

      <P>
        When strings are hashed with Bab, servers can embed into the data stream small proofs that the data they sent so far is indeed prefixing the requested string. More specifically, Bab enables the following features (all explained in detail in <Rc n="rationale"/>):
      </P>

      <Ul>
        <Li>secure content-addressing,</Li>
        <Li>incremental verification of streaming string data,</Li>
        <Li>efficient verification of arbitrary subslices within a string, and</Li>
        <Li>constant-size length proofs for strings.<Marginale>While we explore Bab in the context of hashing, you can also think of it as an <Bib item="tamassia2003authenticated">authenticated data structure</Bib> for arrays.</Marginale></Li>
      </Ul>

      <P>
        Bab employs many of the same techniques as the <Bib item="blake3">BLAKE3-based</Bib> <A href="https://github.com/oconnor663/bao/blob/master/docs/spec.md">Bao</A> specification. Key differences are short proofs of string length, more efficient slice requests, and a hash-function-agnostic specification. Bao is a byproduct of a well-designed general-purpose hash function, whereas Bab is a family of special-purpose hash functions that gets to add features beyond Bao’s capabilities.
      </P>

      <P>
        We define Bab in <Rc n="the_function"/>, before explaining and justifying the design in <Rc n="rationale"/>, both from a high-level view and in its details. We examine optimizations for verified streaming in <Rc n="optimizations"/>.
      </P>
    </Hsection>

    <Hsection n="the_function" title="The Bab Hash Function">
      <P>
        Like BLAKE3, Bab hashes an input string by splitting it into chunks, and arranging the chunks as the roots of a deterministically constructed, <A href="https://en.wikipedia.org/wiki/Binary_tree">binary</A>, <A href="https://en.wikipedia.org/wiki/Merkle_tree">Merkle-tree</A>; the label of the root becomes the digest of the input.
      </P>

      <Hsection n="parameters" title="Parameters">
        <P>
          Bab leaves open some paramters, they need to be given as <Quotes>input</Quotes> to the Bab specification.
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
          To hash a bytestring <R n="in"/> that was split into a <R n="chunk"/> sequence <R n="chunks"/>, Bab constructs the unique binary tree with one leaf per <R n="chunk"/> such that all left subtrees are complete trees, and the size of the left subtrees is strictly decreasing from left to <Sidenote note={<>
            This characerization is taken from the <Bib item="blake3">BLAKE3 paper</Bib>. The construction is identical to that of the certificate transparency logs of <Bib item="laurie2021certificate">RFC 9162</Bib>.
          </>}>right</Sidenote>. we number the vertices in <A href="https://en.wikipedia.org/wiki/Tree_traversal#Breadth-first_search">depth-first</A> order, prioritizing left children over right children, starting at <M>1</M> in the root. <Rc n="fig_tree_unlabeled"/> shows an example.
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
            alt="The Merkle-tree for the input string *hello_world* at a chunk size of two bytes."
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
                The label computations for the example tree from <Rc n="fig_tree_unlabeled"/>.
              </P>
            </>
          }
        >
          <Img
            src={<ResolveAsset asset={["graphics", "tree_labeled.svg"]} />}
            alt="The Merkle-tree for the input string *hello_world* at a chunk size of two bytes, where each vertex shows how to compute its label."
          />
        </Fig>
        
      </Hsection>

      <Hsection n="instantiations" title="Instantiations">
        <P>
          The choice of parameters for using Bab is flexible, but some care needs to be taken to create a secure (i.e., collision-resistant and preimage-resistant) hash function. <R n="hash_chunk"/> and <R n="hash_inner"/> must be secure hash functions themselves, and it must further be impossible to find an input to <R n="hash_chunk"/> and one to <R n="hash_inner"/> such that both yield the same digest. Instantiations may let <R n="hash_inner"/> ignore the length argument without compromising collision-resistance or preimage-resistance, at the cost of losing efficient string length proofs (see <Rc n="length_verification"/> for details).
        </P>

        <P>
          We supply two useful instantiations: one based on arbitrary secure hash functions, and a more efficient one that closely mimics BLAKE3.
        </P>

        <Hsection n="instantiations_from_secure" title="Via Conventional Hash Functions">
          <PreviewScope>
            <P>
              Given a conventional, secure hash function <DefFunction n="conv_h" r="h"/> of digest size <DefValue n="conv_width" r="w"/>, we can instantiate Bab for a <R n="width"/> of <R n="conv_width"/> and an arbitrary <R n="chunk_size"/>.
            </P>

            <P>
              Define <Application fun="hash_chunk" args={[<DefValue n="conv_chunk_chunk" r="chunk"/>, <DefValue n="conv_chunk_root" r="is_root"/>]}/> as applying <R n="conv_h"/> to the concatenation of
                <Ul>
                  <Li>
                    the byte <Code>0x00</Code> if <R n="conv_chunk_root"/> is <Code>false</Code>, or the byte <Code>0x01</Code> otherwise, and
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
        
        <Hsection n="instantiations_william" title="WILLIAM3">
          <PreviewScope>
            <P>
              <DefFunction n="william3" r="WILLIAM3" rb="WILLIAM3"/> is a Bab instantiation that is almost identical to BLAKE3. There are only two differences: <R n="william3"/> does not supply chunk indices into the label computation for chunks, and <R n="william3"/> incorporates a length value into the label computation of inner tree vertices. <Rb n="william3"/> has a normal hash mode and a keyed hash mode (based on a 256 bit key); unlike BLAKE3 it does not support a key derivation mode, and it does not allow for extendable output.
            </P>

            <P>
              <Rb n="william3"/> uses a <R n="chunk_size"/> of 1024 bytes (just like BLAKE3). Its <R n="width"/> is 32 bytes (just like BLAKE3).
            </P>

            <P>
              The <R n="hash_chunk"/> function is almost identical to the BLAKE3 computation of <Em>chunk chaining values</Em>, with a single exception<Marginale>Explained in <Rc n="chunk_indices"/>.</Marginale>: where BLAKE3 sets the <Code>t</Code> parameter of its compression function to the chunk index, <R n="william3"/> sets it to 0.
            </P>

            <P>
              The <R n="hash_inner"/> function is almost identical to the BLAKE3 computation of <Em>parent node chaining values</Em>, with a single exception<Marginale>Explained in <Rc n="length_verification"/>.</Marginale>: whereas BLAKE3 sets the <Code>t</Code> parameter of its compression function to 0, <R n="william3"/> sets <Code>t</Code> to the third argument (the length value) of <R n="hash_chunk"/> (as an unsigned <Em>little</Em>-endian 64-bit integer).
            </P>
          </PreviewScope>
        </Hsection>
      </Hsection>
    </Hsection>

    <Hsection n="rationale" title="Design Rationale">
      <P>
        We now explain the decisions that went into the definition of Bab.<Marginale>Bab is heavily based off BLAKE3 and Bao, so many of these rationales are restating the design work that went into BLAKE3 and Bao. Compared to those two, only little creativity went into the design of Bab.</Marginale>
      </P>

      <Hsection n="streaming_verification" title="Streaming Verification">
        <P>
          Using the root label of a Merkle-tree as the digest allows verifying that some string is a prefix of a string of a known digest. To do so, each chunk is preceded by the labels of the left and right children of all inner vertices on the path from the root of the tree to that chunk. As an optimization, each label is transmitted at most once; it is the receiver’s responsibility to cache labels until they are not needed for verification any longer. This data stream is preceded by the length of the string to yield the <Def n="baseline" r="baseline verifiable stream" preview={<>
            <P>
              The <Def fake n="baseline" r="baseline verifiable stream"/> of a string allows for streaming authentication of a get request for a digest. It starts with the length of the requested string, followed by the chunks of the string, where each chunk is preceded by some metadata: the labels of the left and right children of all inner vertices on the path from the root of the tree to that chunk. Each label is transmitted at most once, duplicates are omitted.
            </P>
          </>}/>. <Rcb n="fig_stream"/> gives an example:
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
          The client can verifies stream by eargerly reconstructing the labels of tree nodes and asserting that the computed labels match the received data. You can go through the verification process for the example stream step by step below. Each step consists of reading either a full label or a full chunk from the stream. The graphic shows the Merkle tree and indicates for each node the knowledge that the client has about it: dim if the client has not yet received any data concerning it, diagonally striped orange if the client has received data that it will need later but cannot verify yet, green if it could verify the data and needs to keep it for verification of subsequent data, and gray if it has verified the data and will not need it for any future verification steps.
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
                computations: [{isChunk: false, resultsIn: 1, left: 2, right: 9, len:11, isRoot: true}],
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
                computations: [{isChunk: true, index: 7, content: "o_"}],
              },
              {
                boxStatuses: ["done", "done", "veri", "done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "miss", "miss", "miss", "miss"],
                computations: [{isChunk: true, index: 8, content: "wo"}],
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
        <PreviewScope>
          <P>
            The Merkle-tree design allows for verifiable streaming of any slice (of chunks) within a string of known digest. Assume a client wants to receive some number of chunks, starting at some chunk offset. The response data is defined with the same technique as for the <R n="baseline"/>: the transmission of each chunk <Em>in the slice</Em> is preceded by the labels of the left and right children of all inner vertices on the path from the root of the tree to that chunk. Chunks outside the slice do not contribute any data. Again, each label is transmitted at most once. Since the length of the slice is known to the client, the response need not be prefixed by the length. We call this transmission the <Def n="baseline_chunk" r="baseline verifiable chunk stream"/>. <Rcb n="fig_stream_slice"/> shows an example of which data needs to be transmitted when the client requests three chunks, starting at offset two (zero-indexed).
          </P>
        </PreviewScope>

        <Fig
          n="fig_stream_slice"
          // wrapperTagProps={{clazz: "wide"}}
          title="Verifiable Slice Streaming Example"
          caption={
            <>
              <P>
                The vertices of our recurring example tree, each showing the data that they contribute to let a client incrementally verify the slice <Code>o_worl</Code> in the string <Code>hello_world</Code>.
              </P>
              <P>
                The list of vertices in the order in which they contribute their child labels or chunks has some gaps, but is still strictly ascending: <M post=".">1, 2, 6, 7, 8, 9, 10</M>
              </P>
            </>
          }
        >
          <P>
            <Turbo1><Application fun="lbl" args={["2"]}/></Turbo1>, <Turbo2><Application fun="lbl" args={["9"]}/></Turbo2>, <Turbo3><Application fun="lbl" args={["3"]}/></Turbo3>, <Turbo4><Application fun="lbl" args={["6"]}/></Turbo4>, <Turbo9><Application fun="lbl" args={["7"]}/></Turbo9>, <Turbo10><Application fun="lbl" args={["8"]}/></Turbo10>, <Turbo11><Code>o_</Code></Turbo11>, <Turbo12><Code>wo</Code></Turbo12>, <Turbo13><Application fun="lbl" args={["10"]}/></Turbo13>, <Turbo14><Application fun="lbl" args={["11"]}/></Turbo14>, <Turbo15><Code>rl</Code></Turbo15>.
          </P>
          <Img
            src={<ResolveAsset asset={["graphics", "example_slice_stream.svg"]} />}
            alt="A visualization of the Merkle tree for the string *hello_world*, listing in each vertex the data that that vertex contributes to the verified data stream for the subslice *o_worl*."
          />
        </Fig>

        <P>
          You can step through the verification process for this example below:
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
                computations: [{isChunk: false, resultsIn: 1, left: 2, right: 9, len:11, isRoot: true}],
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
          A server can provide a short proof for the length of any string to a client who already has the digest of that string. If the string fits into a single <R n="chunk"/>, the proof simply is that chunk itself (the client can reconstruct the digest and assert that it matches). If the string is longer than a single <R n="chunk"/>, then the root of the Merkle tree is an inner node. The server can then supply the length of the string together with the labels of the left and right children of the root. The client feeds these into <R n="hash_inner"/> and asserts that the result matches the digest.
        </P>

        <P>
          BLAKE3 does <Em>not</Em> incorporate lengths into the computation of inner vertex labels. BLAKE3 still supports length proofs, these consist of the length followed by the same data as a reply to a slice request for only the final chunk. Such a proof always contains at least a full chunk, plus twice the height of the tree in labels; its size is logarithmic in the length of the string. For a moderately short string (say, 4096 bytes), the length proof via BLAKE3 has a size of <M>8 + 2 \cdot 2 \cdot 32 + 1024 = 1160</M> bytes. The corresponding <R n="william3"/> lenght proof, in comparison, requires <M>2 \cdot 32 + 8 = 72</M> bytes.
        </P>

        <P>
          A Bab instantiation can choose to simply ignore the length argument in <R n="hash_inner"/>. This can simplify the implementation, but means losing constant-size length proofs. Such an instantiation can still use the same technique as BLAKE3 for logarithmically-sized length proofs: supply the length, followed by the verification data for a slice consisting of the final chunk of the string.
        </P>

        <P>
          For secure, constant-size length proofs, it would suffice to factor the length only into the computation of the root label, but ignore it in the computation of non-root inner labels. Bab <Em>can</Em> be instantiated to this effect: since <R n="hash_inner"/> takes an <Code>is_root</Code> flag as an argument, an instantiation can choose to only factor the length into the label computation if <Code>is_root</Code> is <Code>true</Code>. <R n="william3"/> incorporates the length into all node primarily for <Sidenote note={<>
            Although it would be possible to implement root-only length-incorporation in a branchless manner: treat <Code>is_root</Code> as a number (either zero or one), and multiply the length with that number before incorporating it. 
          </>}>simplicity</Sidenote>.
        </P>
      </Hsection>

      <Hsection n="why_is_root" title="The is_root Flag">
        <P>
          Both <R n="hash_chunk"/> and <R n="hash_inner"/> take a boolean <Code>is_root</Code> flag as an argument. This flag <Em>must</Em> influence the output to guard against <A href="https://en.wikipedia.org/wiki/Length_extension_attack">length extension attacks</A>. The flag ensures <Bib item="bertoni2014sufficient">final-node separability</Bib> (called <Quotes>subtree-freeness</Quotes> by the BLAKE3 authors), which prevents length extension attacks. Ignoring the flag does <Em>note</Em> make the resulting hash function insecure, but it does open up length-extension attacks.
        </P>
      </Hsection>

      <Hsection n="chunk_indices" title="No Chunk Indices">
        <P>
          BLAKE3 includes the index of each <R n="chunk"/> when computing leaf labels in the Merkle-tree. Bab does not. The authors of BLAKE3 give a clear justification for why they added chunk indices:<Marginale>See the <A href="https://raw.githubusercontent.com/BLAKE3-team/BLAKE3-specs/master/blake3.pdf#section.7">BLAKE3 paper, section 7.5</A>.</Marginale>
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

      <Hsection n="binary_tree" title="The Binary Tree">
        <P>
          Binary trees are not the only candidate digraphs as the merkelization backbone. Other candidate constructions include ternary trees (which are more efficient than binary trees <A href="https://en.wikipedia.org/wiki/Optimal_radix_choice#Ternary_tree_efficiency">in some applications</A>), and <A href="https://aljoscha-meyer.de/reed/">efficient binary linking schemes</A>. However, for verified streaming, binary trees turn out to be more efficient.
        </P>

        <P>
          Interestingly enough, the humble linked list, aka hash chain, has some intriguing properties. If the Merkle-DAG was a linked list where the label of the second chunk incorporates the label of the first chunk, the label of the third chunk that of the second, and so on, verified streaming could be done without sending <Em>any</Em> internal labels — by sending chunks in reverse order. Unfortunately, the worst-case size of slice verification proofs would be linear in the size of the tree. This dilemma is similar to that encountered in <A href="https://aljoscha-meyer.de/reed/assets/references/meyer2023sok.pdf">secure timestamping and related problems</A>.
        </P>

        <P>
          Also note that the Merkle tree structure allows for easy parallelization of hash computation, whereas a linked list (or any linking scheme) completely precludes parallelization.
        </P>
      </Hsection>

      <Hsection n="chunk_size_concerns" title="Parameterized Chunk Size">
        <P>
          Bab leaves the <R n="chunk_size"/> as a freely choosable parameter, because different values incur different tradeoffs. At the most basic, a larger <R n="chunk_size"/> shrinks the Merkle tree and thus reduces the metadata overhead in verified streaming, but it also increases the amount of data that needs to be read in sequence without being able to verify it immediately. The <R n="chunk_size"/> also serves as an upper bound to the size of proofs of string length in Bab. Finally, the chunk size also affects the performance of computing digests, see the discussion in <Bib item="blake3">Section 7.1 of the BLAKE3 paper</Bib>.
        </P>
      </Hsection>

    </Hsection>

    <Hsection n="optimizations" title="Optimized Streaming Verification">
      <P>
        The <R n="baseline"/> imposes a certain overhead compared to transmitting a raw string. When instantiating with a <R n="width"/> of 32 bytes and a <R n="chunk_size"/> of 1024 bytes (like BLAKE3 and <R n="william3"/>), roughly 3.1% of streaming data is metadata. This is already a fairly low overhead, but it turns out we can do better.
      </P>

      <P>
        There are redundancies in the <R n="baseline"/>. Consider again <Rc n="fig_stream"/>, where the stream starts with (<Application fun="lbl" args={["2"]}/>, <Application fun="lbl" args={["9"]}/>, <Application fun="lbl" args={["3"]}/>, <Application fun="lbl" args={["6"]}/>, …). <Application fun="lbl" args={["2"]}/> can be computed from <Application fun="lbl" args={["3"]}/> and <Application fun="lbl" args={["6"]}/>, and both of those are transmitted. So why transmit the redundant <Application fun="lbl" args={["2"]}/>?
      </P>

      <P>
        Technically, <Em>all</Em> label transmissions are redundant: if the server sends only the chunks (i.e., simply the string itself), the client can successfully reconstruct the digest. The interesting part is the longest consecutive sequence of bytes that the client receives without being able to verify. When sending the raw string, that sequence is simply all of the string but its final byte. The <R n="baseline"/> minimizes the length of the longest unverifiable sequence. A scheme that skips <Application fun="lbl" args={["2"]}/> sits between the two <Sidenote note={<>Or at least it <Em>appears</Em> to do so at first glance.</>}>extremes</Sidenote>. We now examine the notion of unverifiable subsequences in a verification data stream, and how to leverage it for optimizations.
      </P>

      <Hsection n="unverifiable_sequences" title="Unverifiable Sequences">
        <PreviewScope>
          <P>
            When receiving a string interleaved with verification metadata, we call a transmitted label <Def n="verified"/> if it is the root <Sidenote note="We assume that the client trusts the digest it uses for a request.">label</Sidenote>, or if it and its sibling label have been fed into <R n="hash_inner"/>, yielded the label of the parent vertex, and the parent label has also been <R n="verified"/>. We call a <R n="chunk"/> <Def fake n="verified"/> if it has been fed into <R n="hash_chunk"/>, yielded the label of the vertex corresponding to the <R n="chunk"/>, and that label has also been <R n="verified"/>.
          </P>
        </PreviewScope>

        <PreviewScope>
          <P>
            An <Def n="unverifiable_seq" r="unverifiable sequence" rs="unverifiable sequences"/> is a sequence of consecutive bytes in a response stream whose corresponding labels and chunks cannot yet be <R n="verified"/>. We call the length of a maximal <R n="unverifiable_seq"/> of a stream its <Def n="delay" r="verification delay" rs="verification delays"/>.
          </P>
        </PreviewScope>

        <P>
          What are the <Rs n="unverifiable_seq"/> in the <R n="baseline"/>? Any partially transmitted label is unverifiable. Further, a label of a left child is unverifiable without the label of its sibling. Since these are always transmitted in succession, the longest <Rs n="unverifiable_seq"/> contributed by labels have length <M post=".">2 \cdot <R n="width"/> - 1</M> <Rsb n="chunk"/> can only be verified when their final byte gets received, so they contribute <Rs n="unverifiable_seq"/> of length <M post="."><R n="chunk_size"/> - 1</M>
        </P>

        <P>
          This puts the <R n="delay"/> of the <R n="baseline"/> at the maximum of <M>2 \cdot <R n="width"/> - 1</M> and <M post="."><R n="chunk_size"/> - 1</M> In most practical instantiations, the <R n="chunk_size"/> should <Sidenote note={<>
            BLAKE3 and <R n="william3"/>, for example, have a <R n="width"/> of 32 bytes and a <R n="chunk_size"/> of 1024 bytes.  
          </>}>dominate</Sidenote>. For the remainder of this document, we will assume that <M post=","><R n="chunk_size"/> \geq 2 \cdot <R n="width"/></M> yielding a <R n="delay"/> of the <R n="baseline"/> of <M post="."><R n="chunk_size"/> - 1</M>
        </P>

        <P>
          The <R n="delay"/> gives an upper bound of how much progress is lost if a connection failure occurs in the worst possible moment. It also gives the greatest amount of untrusted data that a client has to buffer in memory <Sidenote note={<>
            This number is one greater than the <R n="delay"/>, because the final byte also needs to be loaded into memory for verification. Verification of <Rs n="chunk"/> might not require holding the full <R n="chunk"/> in memory, but we assume that the client requested the chunk data for a reason, and thus has to hold on to it even if not strictly necessary for verification alone.
          </>}>simultaneously</Sidenote>.
        </P>

        <P>
          Note that this required buffer capacity is mostly independent from the memory that the client needs for buffering <R n="verified"/> labels for reuse in later assertions. Every label of a right child needs to be kept in memory after verification, in order to verify the labels of <Em>its</Em> two children. Hence, verification always requires the capacity to buffer one label per layer of the Merkle-tree (see <A href="#exVeriDefault_5">this example</A>).
        </P>
      </Hsection>

      <Hsection n="left_label_omission" title="Omitting Left Labels">
        <P>
          When a response stream omits a left label, the client cannot verify the corresponding right label when it arrives. But it can, at a later point, reconstruct the left label, and then use the reconstructed data to verify both the right label and the reconstructed one. We now describe this process more precisely, and then we investigate how to improve upon the <R n="baseline"/> with this technique.
        </P>

        <PreviewScope>
          <P>
            Let <DefValue n="llo_p" r="p"/> be an inner Merkle-tree vertex with left child <DefValue n="llo_l" r="l"/> and right child <DefValue n="llo_r" r="r"/>. What precisely happens when we omit <Application fun="lbl" args={[<R n="llo_l"/>]}/> from the <R n="baseline"/>? 
          </P>
        </PreviewScope>

        <P>
          After the omitted label, the stream continues with <Application fun="lbl" args={[<R n="llo_r"/>]}/>. Unlike in the unmodified <R n="baseline"/>, the client cannot verify <Application fun="lbl" args={[<R n="llo_l"/>]}/> immediately; the client needs to buffer it as unverified data instead. Next, the stream continues with the data corresponding to <R n="llo_l"/>. There are two cases, depending on whether <R n="llo_l"/> is a leaf vertex or an inner vertex.
        </P>

        <P>
          If <R n="llo_l"/> is a leaf vertex, then the stream continues with a <R n="chunk"/>. This chunk can be fed into <R n="hash_chunk"/> to recover a (still unverified) candidate label of <R n="llo_l"/>. Feeding this candidate label and the (still unverified) <Application fun="lbl" args={[<R n="llo_r"/>]}/> into <R n="hash_inner"/> yields a candidate label for <R n="llo_p"/>. The client can now compare the candidate label for <R n="llo_p"/> against the actual <Application fun="lbl" args={[<R n="llo_p"/>]}/> that it received and verified earlier in the stream. If they are equal, then both the received chunk and the received <Application fun="lbl" args={[<R n="llo_r"/>]}/> are successfully <R n="verified"/>.
        </P>

        <P>
          If <R n="llo_l"/> is an inner vertex, then the stream continues with the labels of the left and right children of <R n="llo_l"/>. These can be fed into <R n="hash_inner"/> to recover a (still unverified) candidate label of <R n="llo_l"/>. The client can then perform the same verification steps as in the first case, leading to verification of both the labels of the children of <R n="llo_l"/>, and of <Application fun="lbl" args={[<R n="llo_r"/>]}/>.
        </P>

        <P>
          When omitting the label of a leaf vertex <R n="llo_l"/>, the <R n="delay"/> <Sidenote note={<>
            Remember our assumption that <M post="."><R n="chunk_size"/> \geq 2 \cdot <R n="width"/></M>
          </>}>increases</Sidenote> by <R n="width"/>. But when <R n="llo_l"/> is an <Em>inner</Em> vertex, an <R n="unverifiable_seq"/> of length <M>2 \cdot <R n="width"/></M> is turned into an <R n="unverifiable_seq"/> of length <M post=".">3 \cdot <R n="width"/></M> If <M post=","><R n="chunk_size"/> \geq 3 \cdot <R n="width"/></M> then the <R n="delay"/> remains unchanged — despite omitting <R n="width"/> many bytes from the verification stream!
        </P>

        <P>
          Moreover, we can omit successive left labels from the <R n="baseline"/> by iterating the reconstruction of the labels. For each successively omitted left label, the corresponding right label needs to be buffered in an unverified state. <Rcb n="fig_ex_light"/> shows the stream when omitting all left labels except those that are labels of leaf vertices for the <Code>hello_world</Code> example (that is, omitting the labels of vertices <M>2</M> and <M post="):">3</M>
        </P>

        <Fig
          n="fig_ex_light"
          // wrapperTagProps={{clazz: "wide"}}
          title="Omitting Left Labels Example"
          caption={
            <>
              <P>
                The labels that remain in the <R n="baseline"/> when omitting left labels (except those that are labels of leaves).
              </P>
            </>
          }
        >
          <P>
            <Sidenote note="The length of the original string in bytes."><Code>11</Code></Sidenote>, <Turbo2><Application fun="lbl" args={["9"]}/></Turbo2>, <Turbo4><Application fun="lbl" args={["6"]}/></Turbo4>, <Turbo5><Application fun="lbl" args={["4"]}/></Turbo5>, <Turbo6><Application fun="lbl" args={["5"]}/></Turbo6>, <Turbo7><Code>he</Code></Turbo7>, <Turbo8><Code>ll</Code></Turbo8>, <Turbo9><Application fun="lbl" args={["7"]}/></Turbo9>, <Turbo10><Application fun="lbl" args={["8"]}/></Turbo10>, <Turbo11><Code>o_</Code></Turbo11>, <Turbo12><Code>wo</Code></Turbo12>, <Turbo13><Application fun="lbl" args={["10"]}/></Turbo13>, <Turbo14><Application fun="lbl" args={["11"]}/></Turbo14>, <Turbo15><Code>rl</Code></Turbo15>, <Turbo16><Code>d</Code></Turbo16>.
          </P>
          <Img
            src={<ResolveAsset asset={["graphics", "tree_light.svg"]} />}
            alt="A visualization of the Merkle tree for the string *hello_world*, listing in each vertex the data that that vertex contributes to the verified data stream, but omitting the labels for vertices 2 and 3."
          />
        </Fig>

        <P>
          Below, you can step through the verification process. <A href="#exVeriLight_3">Step 4</A> demonstrates the cascading verification of several buffered, unverified right labels.
        </P>

        <Div clazz="wide">
          <VisualizeVerification
            slidesId="exVeriLight"
            compact
            layers={4}
            boxes={exampleBoxes}
            skipping={[1, 3]}
            steps={[
              {
                boxStatuses: ["veri", "miss", "unve", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss"],
                computations: [],
              },
              {
                boxStatuses: ["veri", "miss", "unve", "miss", "unve", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss"],
                computations: [],
              },
              {
                boxStatuses: ["veri", "miss", "unve", "miss", "unve", "unve", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss"],
                computations: [],
              },
              {
                boxStatuses: ["done", "done", "veri", "done", "veri", "veri", "veri", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss"],
                computations: [
                  {isChunk: false, resultsIn: 3, left: 4, right: 5, len: 4},
                  {isChunk: false, resultsIn: 2, left: 3, right: 6, len: 8},
                  {isChunk: false, resultsIn: 1, left: 2, right: 9, len:11, isRoot: true},
                ],
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
                computations: [{isChunk: true, index: 7, content: "o_"}],
              },
              {
                boxStatuses: ["done", "done", "veri", "done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "miss", "miss", "miss", "miss"],
                computations: [{isChunk: true, index: 8, content: "o_"}],
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

        <P>
          This construction suggests a natural optimization over the <R n="baseline"/>: keep the labels of all leaf vertices, but omit as many left labels on the paths from the leaves to the root as can be omitted without increasing the <R n="delay"/>. If the <R n="delay"/> would be increased, instead include the label, but then resume omitting as many left labels as possible along the remaining path to the root again. This way, only one out of <M><R n="chunk_size"/> / <R n="width"/></M> left labels needs to be transmitted.
        </P>

        <PreviewScope>
          <P>
            More precisely: define the <Def n="layer"/> of a tree vertex as the length of the path from it to its leftmost leaf. The <R n="layer"/> of a leaf is <M post=",">0</M> the <R n="layer"/> of a vertex whose left child is a leaf is <M post=",">1</M> and so on. Assume that <M post="."><R n="chunk_size"/> \geq 2 \cdot <R n="width"/></M> Then, the <Def n="light" r="light verifiable stream"/> of a string is its <R n="baseline"/>, except omitting those labels that are contributed to the stream as left children and that are not labelling vertices whose <R n="layer"/> is divisible by <M post=".">\lceil<R n="chunk_size"/> / <R n="width"/>\rceil</M> 
          </P>
        </PreviewScope>

        <P>
          BLAKE3 and <R n="william3"/> have a <R n="width"/> of 32 bytes and a <R n="chunk_size"/> of 1024 bytes, putting the quotient at <M post="."><MFrac num="1024" de="32"/> = 32</M> Omitting all but one out of 32 left labels reduces total number of labels by a factor of <M post="."><MFrac num="32 + 1" de="32 + 32"/> = <MFrac num="33" de="64"/> \approx <MFrac num="1" de="2"/></M> Whereas the <R n="baseline"/> has a verification metadata overhead of roughly 3.1% for Bao and <R n="william3"/>, the <R n="light"/> reduces the overhead to roughly 1.6%, without increasing the <R n="delay"/>.
        </P>
      </Hsection>

      <Hsection n="omitting_layers" title="Omitting Lower Layers">
        <PreviewScope>
          <P>
            In addition to the <R n="light"/>, there is an elegant way to reduce metadata transmission in exchange for increasing the <R n="delay"/>: skipping all metadata for the <M><Def n="k"/></M> lowest layers of the Merkle tree. These labels have to be reconstructed from successive <Rs n="chunk"/>; reconstructing a label of layer <M><Def n="i"/></M> requires <M>2^<Curly>{<R n="i"/>}</Curly></M> <Rs n="chunk"/>. Hence, the <R n="delay"/> increases to <M post=".">2^<Curly>{<R n="k"/>}</Curly> \cdot <R n="chunk_size"/> - 1</M>
          </P>

          <P>
            In the upper layers of the tree, we omit left labels according to the new <R n="delay"/>: the left label of vertices on layer <R n="k"/> must be present, but the labels of the next <M>\lceil<Curly>2^<Curly><R n="k"/></Curly> \cdot <R n="chunk_size"/></Curly> / <R n="width"/>\rceil</M> are skipped. The labels of the next layer are included, then more layers can be skipped, and so on. We call this stream the <Def n="kgrouped" r="k-grouped light verifiable stream"/>.
          </P>

          <P>
            We can also apply the optimization of omitting the lowest <R n="k"/> layers without omitting left labels higher up in the tree. We call the resulting stream the <Def n="kgrouped_baseline" r="k-grouped baseline verifiable stream"/><Marginale>
              For <M post=","><R n="k"/> = 0</M> the <R n="kgrouped"/> coincides with the <R n="light"/>, and the <R n="kgrouped_baseline"/> coincides with the <R n="baseline"/>.  
            </Marginale>. Since the <R n="kgrouped"/> has the same <R n="delay"/> but is shorter, it should be preferred.
          </P>
        </PreviewScope>

        <P>
          <Rcb n="fig_ex_kgrouped"/> shows the <R n="kgrouped">1-grouped light verifiable stream</R> for our running example.
        </P>

        <Fig
          n="fig_ex_kgrouped"
          // wrapperTagProps={{clazz: "wide"}}
          title="1-Grouped Verifiable Stream Example"
          caption={
            <>
              <P>
                The verification data to send for <Code>hello_world</Code> with a <R n="chunk_size"/> of two in the <R n="kgrouped">1-grouped light verifiable stream</R>.
              </P>
            </>
          }
        >
          <P>
            <Sidenote note="The length of the original string in bytes."><Code>11</Code></Sidenote>, <Turbo2><Application fun="lbl" args={["9"]}/></Turbo2>, <Turbo3><Application fun="lbl" args={["3"]}/></Turbo3>, <Turbo4><Application fun="lbl" args={["6"]}/></Turbo4>, <Turbo7><Code>he</Code></Turbo7>, <Turbo8><Code>ll</Code></Turbo8>, <Turbo11><Code>o_</Code></Turbo11>, <Turbo12><Code>wo</Code></Turbo12>, <Turbo15><Code>rl</Code></Turbo15>, <Turbo16><Code>d</Code></Turbo16>.
          </P>
          <Img
            src={<ResolveAsset asset={["graphics", "tree_1grouped.svg"]} />}
            alt="A visualization of the Merkle tree for the string *hello_world*, listing in each vertex the data that that vertex contributes to the 1-grouped light verifiable stream."
          />
        </Fig>

        <P>
          Below, you can step through the verification process:
        </P>

        <Div clazz="wide">
          <VisualizeVerification
            slidesId="exKgrouped"
            compact
            layers={4}
            boxes={exampleBoxes}
            skipping={[1, 5, 6, 9, 10, 13, 14]}
            steps={[
              {
                boxStatuses: ["veri", "miss", "unve", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss"],
                computations: [],
              },
              {
                boxStatuses: ["veri", "miss", "unve", "unve", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss"],
                computations: [],
              },
              {
                boxStatuses: ["done", "done", "veri", "veri", "veri", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss"],
                computations: [
                  {isChunk: false, resultsIn: 2, left: 3, right: 6, len: 8},
                  {isChunk: false, resultsIn: 1, left: 2, right: 9, len:11, isRoot: true},
                ],
              },

              {
                boxStatuses: ["done", "done", "veri", "veri", "veri", "miss", "miss", "unve", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss"],
                computations: [],
              },
              {
                boxStatuses: ["done", "done", "veri", "done", "veri", "done", "done", "done", "done", "miss", "miss", "miss", "miss", "miss", "miss", "miss", "miss"],
                computations: [
                  {isChunk: true, index: 4, content: "he"},
                  {isChunk: true, index: 5, content: "ll"},
                  {isChunk: false, resultsIn: 3, left: 4, right: 5, len: 4},
                ],
              },
              {
                boxStatuses: ["done", "done", "veri", "done", "veri", "done", "done", "done", "done", "miss", "miss", "unve", "miss", "miss", "miss", "miss", "miss"],
                computations: [],
              },
              {
                boxStatuses: ["done", "done", "veri", "done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "miss", "miss", "miss", "miss"],
                computations: [
                  {isChunk: true, index: 7, content: "o_"},
                  {isChunk: true, index: 8, content: "o_"},
                  {isChunk: false, resultsIn: 6, left: 7, right: 8, len: 4},
                ],
              },
              {
                boxStatuses: ["done", "done", "veri", "done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "miss", "miss", "unve", "miss"],
                computations: [],
              },
              {
                boxStatuses: ["done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "done", "done"],
                computations: [
                  {isChunk: true, index: 10, content: "rl"},
                  {isChunk: true, index: 11, content: "d"},
                  {isChunk: false, resultsIn: 9, left: 10, right: 11, len: 3},
                ],
              },
            ]}
          />
        </Div>
      </Hsection>

      <Hsection n="slice_streaming" title="Slice Streaming">
        <P>
          All optimized verifiable streams can also be used for verifiable streaming of slices, by incorporating two changes.
          First, a label or chunk that would not be transmitted as part of the <R n="baseline_chunk"/> is also not part of the optimized chunk <Sidenote note="This simply filters down the stream from a full-string stream to a slice stream.">stream</Sidenote>.
          And second, the labels of vertices which do <Em>not</Em> lie on a path from a chunk of the slice to the root but which <Em>would</Em> be included in the <R n="baseline_chunk">baseline verifiable <Strong>chunk</Strong> stream</R> are <Em>never</Em> <Sidenote note={<>
            If such a label was omitted, the label of the corresponding parent vertex would be impossible to reconstruct.
          </>}>omitted</Sidenote>.
        </P>

        <P>
          <Rcb n="fig_slice_light"/> and <Rc n="fig_slice_grouped"/> give examples of a left and right label respectively being included in an optimized slice stream despite being omitted when requesting the full string with the same optimizations.
        </P>

        <Fig
          n="fig_slice_light"
          // wrapperTagProps={{clazz: "wide"}}
          title="Light Verifiable Slice Stream Example"
          caption={
            <>
              <P>
                The verification data to send for <Code>hello_world</Code> with a <R n="chunk_size"/> of two with the <R n="light"/> format when requesting the slice <Code>o_worl</Code>. The label of vertex <M>3</M> is not omitted, despite being omitted in non-slice requests with the <R n="light"/> (compare <Rc n="fig_ex_light"/>).
              </P>
            </>
          }
        >
          <P>
            <Turbo2><Application fun="lbl" args={["9"]}/></Turbo2>, <Turbo3><Application fun="lbl" args={["3"]}/></Turbo3>, <Turbo4><Application fun="lbl" args={["6"]}/></Turbo4>, <Turbo9><Application fun="lbl" args={["7"]}/></Turbo9>, <Turbo10><Application fun="lbl" args={["8"]}/></Turbo10>, <Turbo11><Code>o_</Code></Turbo11>, <Turbo12><Code>wo</Code></Turbo12>, <Turbo13><Application fun="lbl" args={["10"]}/></Turbo13>, <Turbo14><Application fun="lbl" args={["11"]}/></Turbo14>, <Turbo15><Code>rl</Code></Turbo15>.
          </P>
          <Img
            src={<ResolveAsset asset={["graphics", "slice_light.svg"]} />}
            alt="A visualization of the Merkle tree for the string *hello_world*, listing in each vertex the data that that vertex contributes to the verified data stream for the subslice *o_worl* to the light encoding."
          />
        </Fig>

        <Fig
          n="fig_slice_grouped"
          // wrapperTagProps={{clazz: "wide"}}
          title="1-Grouped Light Verifiable Slice Stream Example"
          caption={
            <>
              <P>
                The verification data to send for <Code>hello_world</Code> with a <R n="chunk_size"/> of two with the <R n="kgrouped">1-grouped light verifiable stream</R> format when requesting the slice <Code>o_worl</Code>. The label of vertex <M>11</M> is not omitted, despite being omitted in non-slice requests with the <R n="kgrouped">1-grouped light verifiable stream</R> (compare <Rc n="fig_ex_kgrouped"/>).
              </P>
            </>
          }
        >
          <P>
            <Turbo2><Application fun="lbl" args={["9"]}/></Turbo2>, <Turbo3><Application fun="lbl" args={["3"]}/></Turbo3>, <Turbo4><Application fun="lbl" args={["6"]}/></Turbo4>, <Turbo11><Code>o_</Code></Turbo11>, <Turbo12><Code>wo</Code></Turbo12>, <Turbo14><Application fun="lbl" args={["11"]}/></Turbo14>, <Turbo15><Code>rl</Code></Turbo15>.
          </P>
          <Img
            src={<ResolveAsset asset={["graphics", "slice_1grouped_light.svg"]} />}
            alt="A visualization of the Merkle tree for the string *hello_world*, listing in each vertex the data that that vertex contributes to the verified data stream for the subslice *o_worl* to the 1-grouped light encoding."
          />
        </Fig>

        <P>
          In a system where clients can request slices, it stands to reason they might request several (non-overlapping) slices within the same string. Such non-overlapping slices have an overlap in their verification metadata: the streams include the labels of vertices that lie on a path from included chunks to the root, and these paths overlap towards the root. The closer two slices are, the greater their overlap. In particular, let <M>a</M>, <M>b</M>, and <M>c</M> be slices such that <M>a</M> ends before <M>b</M> starts, and <M>b</M> ends before <M>c</M> starts.
          Then the overlap between any path from the root to a leaf in the slice <M>c</M> and any path from the root to a leaf in <M>a</M> or <M>b</M> is included in the overlap beween the path from the root to the first chunk of <M>c</M> and the path from the root to the final chunk of <M>b</M>.
          Likewise, the overlap between any path from the root to a leaf in the slice <M>a</M> and any path from the root to a leaf in <M>b</M> or <M>c</M> is included in the overlap beween the path from the root to the final chunk of <M>a</M> and the path from the root to the first chunk of <M>b</M>.
        </P>

        <PreviewScope>
          <P>
            For the client to tell the server which parts of the verification metadata need not be included in a slice stream because the client already has that data, it hence suffices for the client to supply two integers between <M>0</M> and <M post=":">64</M> the <DefValue n="left_skip"/> indicates to omit from the stream the labels of the children of the first <R n="left_skip"/> vertices on the path from the root to the <Em>first</Em> chunk of the slice, and the <DefValue n="right_skip"/> indicates to omit from the stream the labels of the children of the first <R n="right_skip"/> vertices on the path from the root to the <Em>final</Em> chunk of the slice. <Rcb n="fig_stream_slice_skip"/> gives an example.
          </P>
        </PreviewScope>

        <Fig
          n="fig_stream_slice_skip"
          // wrapperTagProps={{clazz: "wide"}}
          title="Slice Skipping Example"
          caption={
            <>
              <P>
                Slice streaming with the <R n="baseline"/> format, a <R n="left_skip"/> of <M post=",">2</M> and a <R n="right_skip"/> of <M post=".">2</M>
              </P>
            </>
          }
        >
          <P>
            <Turbo9><Application fun="lbl" args={["7"]}/></Turbo9>, <Turbo10><Application fun="lbl" args={["8"]}/></Turbo10>, <Turbo11><Code>o_</Code></Turbo11>, <Turbo12><Code>wo</Code></Turbo12>, <Turbo15><Code>rl</Code></Turbo15>.
          </P>
          <Img
            src={<ResolveAsset asset={["graphics", "slice_skip.svg"]} />}
            alt="A visualization of the Merkle tree for the string *hello_world*, listing in each vertex the data that that vertex contributes to the verified data stream for the subslice *o_worl* when left_skip and right_skip are set to two."
          />
        </Fig>
      </Hsection>
      
    </Hsection>

    <Hsection n="conclusion" title="Conclusion">
      <P>
        Peer-to-peer content-addressable-storage systems without verifiable streaming force peers to choose between two undesirable options: either they discard unbounded amounts of data upon connection failures, making it unlikely to ever receive large strings over unreliable connections, or they persist untrusted data, turning them into a free storage backend for malicious peers. Verifiable streaming reduces the length of maximal sequences of untrusted data to a constant, configurable amount, thus making it feasible to discard unverified data when a connection fails.
      </P>

      <P>
        <R n="the_function">Bab</R> is an efficient and flexible family of hash functions that enable streaming verification of strings. Its <R n="william3"/> instantiation is close to the popular BLAKE3 hash function. Unlike BLAKE3-based systems (i.e., <A href="https://github.com/oconnor663/bao">Bao</A>), Bab-based systems support <R n="length_verification">constant-size length proofs</R> for strings of known digest. We have presented <R n="optimizations">optimization techniques</R> for minimizing the metadata overhead of streaming verification that are applicable both to Bab and Bao.
      </P>
    </Hsection>

    <Hsection title="References" n="bibliography" noNumbering>
      <Bibliography />
    </Hsection>
  </ArticleTemplate>
);

// Evaluate the expression. This has exciting side-effects,
// like creating a directory that contains a website!
ctx.evaluate(exp);
