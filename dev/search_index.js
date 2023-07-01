var documenterSearchIndex = {"docs":
[{"location":"morton/#Morton-Encoding","page":"Morton Encoding","title":"Morton Encoding","text":"","category":"section"},{"location":"morton/","page":"Morton Encoding","title":"Morton Encoding","text":"ImplicitBVH.MortonUnsigned\nImplicitBVH.morton_encode\nImplicitBVH.morton_encode!\nImplicitBVH.morton_encode_single\nImplicitBVH.morton_scaling\nImplicitBVH.morton_split3\nImplicitBVH.bounding_volumes_extrema","category":"page"},{"location":"morton/#ImplicitBVH.MortonUnsigned","page":"Morton Encoding","title":"ImplicitBVH.MortonUnsigned","text":"Acceptable unsigned integer types for Morton encoding: Union{UInt16, UInt32, UInt64}.\n\n\n\n\n\n","category":"type"},{"location":"morton/#ImplicitBVH.morton_encode","page":"Morton Encoding","title":"ImplicitBVH.morton_encode","text":"morton_encode(bounding_volumes, ::Type{U}=UInt) where {U <: MortonUnsigned}\n\nEncode the centers of some bounding_volumes as Morton codes of type U <: MortonUnsigned. See morton_encode! for full details. \n\n\n\n\n\n","category":"function"},{"location":"morton/#ImplicitBVH.morton_encode!","page":"Morton Encoding","title":"ImplicitBVH.morton_encode!","text":"morton_encode!(mortons::AbstractVector{U}, bounding_volumes) where {U <: MortonUnsigned}\nmorton_encode!(mortons::AbstractVector{U}, bounding_volumes, mins, maxs)\n\nEncode each bounding volume into vector of corresponding Morton codes such that they uniformly cover the maximum Morton range given an unsigned integer type U <: MortonUnsigned.\n\nwarning: Warning\nThe dimension-wise exclusive mins and maxs must be correct; if any bounding volume center is equal to, or beyond mins / maxs, the results will be silently incorrect.\n\n\n\n\n\n","category":"function"},{"location":"morton/#ImplicitBVH.morton_encode_single","page":"Morton Encoding","title":"ImplicitBVH.morton_encode_single","text":"morton_encode_single(centre, mins, maxs, U::MortonUnsignedType=UInt32)\n\nReturn Morton code for a single 3D position centre scaled uniformly between mins and maxs. Works transparently for SVector, Vector, etc. with eltype UInt16, UInt32 or UInt64.\n\n\n\n\n\n","category":"function"},{"location":"morton/#ImplicitBVH.morton_scaling","page":"Morton Encoding","title":"ImplicitBVH.morton_scaling","text":"morton_scaling(::Type{UInt16}) = 2^5\nmorton_scaling(::Type{UInt32}) = 2^10\nmorton_scaling(::Type{UInt64}) = 2^21\n\nExclusive maximum number possible to use for 3D Morton encoding for each type.\n\n\n\n\n\n","category":"function"},{"location":"morton/#ImplicitBVH.morton_split3","page":"Morton Encoding","title":"ImplicitBVH.morton_split3","text":"morton_split3(v::UInt16)\nmorton_split3(v::UInt32)\nmorton_split3(v::UInt64)\n\nShift a number's individual bits such that they have two zeros between them.\n\n\n\n\n\n","category":"function"},{"location":"morton/#ImplicitBVH.bounding_volumes_extrema","page":"Morton Encoding","title":"ImplicitBVH.bounding_volumes_extrema","text":"bounding_volumes_extrema(bounding_volumes)\n\nCompute exclusive lower and upper bounds in iterable of bounding volumes, e.g. Vector{BBox}.\n\n\n\n\n\n","category":"function"},{"location":"bounding_volumes/#Bounding-Volumes","page":"Bounding Volumes","title":"Bounding Volumes","text":"","category":"section"},{"location":"bounding_volumes/","page":"Bounding Volumes","title":"Bounding Volumes","text":"ImplicitBVH.BBox\nImplicitBVH.BSphere","category":"page"},{"location":"bounding_volumes/#Query-Functions","page":"Bounding Volumes","title":"Query Functions","text":"","category":"section"},{"location":"bounding_volumes/","page":"Bounding Volumes","title":"Bounding Volumes","text":"ImplicitBVH.iscontact\nImplicitBVH.center\nImplicitBVH.radius\nImplicitBVH.lower\nImplicitBVH.upper","category":"page"},{"location":"implicit_tree/#Implicit-Binary-Tree","page":"Implicit Binary Tree","title":"Implicit Binary Tree","text":"","category":"section"},{"location":"implicit_tree/","page":"Implicit Binary Tree","title":"Implicit Binary Tree","text":"ImplicitTree\nmemory_index\nlevel_indices\nisvirtual","category":"page"},{"location":"implicit_tree/#ImplicitBVH.ImplicitTree","page":"Implicit Binary Tree","title":"ImplicitBVH.ImplicitTree","text":"struct ImplicitTree{T<:Integer}\n\nImplicit binary tree for num_leaves elements, where nodes are labelled according to a breadth-first search.\n\nMethods\n\nImplicitTree(num_leaves::Integer)\nImplicitTree{T}(num_leaves::Integer)\n\nFields\n\nlevels::Integer: Number of levels in the tree.\nreal_leaves::Integer: Number of real leaves - i.e. the elements from which the tree was constructed.\nreal_nodes::Integer: Total number of real nodes in tree.\nvirtual_leaves::Integer: Number of virtual leaves needed at the bottom level to have a perfect binary tree.\nvirtual_nodes::Integer: Total number of virtual nodes in tree needed for a complete binary tree.\n\nExamples\n\njulia> using ImplicitBVH\n\n# Given 5 geometric elements (e.g. bounding boxes) we construct the following implicit tree\n# having the 5 real leaves at implicit indices 8-12 plus 3 virtual leaves.\n#         Nodes & Leaves                Tree Level\n#               1                       1\n#       2               3               2\n#   4       5       6        7v         3\n# 8   9   10 11   12 13v  14v  15v      4\njulia> tree = ImplicitTree(5)\nImplicitTree{Int64}\n  levels: Int64 4\n  real_leaves: Int64 5\n  real_nodes: Int64 11\n  virtual_leaves: Int64 3\n  virtual_nodes: Int64 4\n\n# We can keep all tree nodes in a contiguous vector with no extra padding for the virtual\n# nodes by computing the real memory index of real nodes; e.g. real memory index of node 8\n# skips node 7 which is virtual:\njulia> memory_index(tree, 8)\n7\n\n# We can get the range of indices of real nodes on a given level\njulia> level_indices(tree, 3)\n(4, 6)\n\n# And we can check if a node at a given implicit index is virtual\njulia> isvirtual(tree, 6)\nfalse\n\njulia> isvirtual(tree, 7)\ntrue\n\n\n\n\n\n","category":"type"},{"location":"implicit_tree/#ImplicitBVH.memory_index","page":"Implicit Binary Tree","title":"ImplicitBVH.memory_index","text":"memory_index(tree::ImplicitTree, implicit_index::Integer)\n\nReturn actual memory index for a node at implicit index i in a perfect BFS-labelled tree.\n\n\n\n\n\n","category":"function"},{"location":"implicit_tree/#ImplicitBVH.level_indices","page":"Implicit Binary Tree","title":"ImplicitBVH.level_indices","text":"level_indices(tree::ImplicitTree, level::Integer)\n\nReturn range Tuple{Int64, Int64} of memory indices of elements at level.\n\n\n\n\n\n","category":"function"},{"location":"implicit_tree/#ImplicitBVH.isvirtual","page":"Implicit Binary Tree","title":"ImplicitBVH.isvirtual","text":"isvirtual(tree::ImplicitTree, implicit_index::Integer)\n\nCheck if given implicit_index corresponds to a virtual node.\n\n\n\n\n\n","category":"function"},{"location":"utilities/#Utilities","page":"Utilities","title":"Utilities","text":"","category":"section"},{"location":"utilities/","page":"Utilities","title":"Utilities","text":"ImplicitBVH.TaskPartitioner","category":"page"},{"location":"utilities/#ImplicitBVH.TaskPartitioner","page":"Utilities","title":"ImplicitBVH.TaskPartitioner","text":"struct TaskPartitioner\n\nPartitioning num_elems elements / jobs over maximum max_tasks tasks with minimum min_elems elements per task.\n\nMethods\n\nTaskPartitioner(num_elems, max_tasks=Threads.nthreads(), min_elems=1)\n\nFields\n\nnum_elems::Int64\nmax_tasks::Int64\nmin_elems::Int64\nnum_tasks::Int64\n\nExamples\n\nusing ImplicitBVH: TaskPartitioner\n\n# Divide 10 elements between 4 tasks\ntp = TaskPartitioner(10, 4)\nfor i in 1:tp.num_tasks\n    @show tp[i]\nend\n\n# output\ntp[i] = (1, 3)\ntp[i] = (4, 6)\ntp[i] = (7, 9)\ntp[i] = (10, 10)\n\nusing ImplicitBVH: TaskPartitioner\n\n# Divide 20 elements between 6 tasks with minimum 5 elements per task.\n# Not all tasks will be required\ntp = TaskPartitioner(20, 6, 5)\nfor i in 1:tp.num_tasks\n    @show tp[i]\nend\n\n# output\ntp[i] = (1, 5)\ntp[i] = (6, 10)\ntp[i] = (11, 15)\ntp[i] = (16, 20)\n\n\n\n\n\n","category":"type"},{"location":"#ImplicitBVH.jl-Documentation","page":"ImplicitBVH.jl Documentation","title":"ImplicitBVH.jl Documentation","text":"","category":"section"},{"location":"#BVH-Construction-and-Traversal","page":"ImplicitBVH.jl Documentation","title":"BVH Construction & Traversal","text":"","category":"section"},{"location":"","page":"ImplicitBVH.jl Documentation","title":"ImplicitBVH.jl Documentation","text":"BVH\ntraverse","category":"page"},{"location":"#ImplicitBVH.BVH","page":"ImplicitBVH.jl Documentation","title":"ImplicitBVH.BVH","text":"struct BVH{VN<:(AbstractVector), VL<:(AbstractVector), VO<:(AbstractVector)}\n\nImplicit bounding volume hierarchy constructed from an iterable of some geometric primitives' (e.g. triangles in a mesh) bounding volumes forming the ImplicitTree leaves. The leaves and merged nodes above them can have different types - e.g. BSphere{Float64} for leaves merged into larger BBox{Float64}.\n\nThe initial geometric primitives are sorted according to their Morton-encoded coordinates; the unsigned integer type used for the Morton encoding can be chosen between Union{UInt16, UInt32, UInt64}.\n\nFinally, the tree can be incompletely-built up to a given built_level and later start contact detection downwards from this level, e.g.:\n\nImplicit tree from 5 bounding volumes - i.e. the real leaves\n\nTree Level          Nodes & Leaves               Build Up    Traverse Down\n    1                     1                         Ʌ              |\n    2             2               3                 |              |\n    3         4       5       6        7v           |              |\n    4       8   9   10 11   12 13v  14v  15v        |              V\n            -------Real------- ---Virtual---\n\nMethods\n\nfunction BVH(\n    bounding_volumes::AbstractVector{L},\n    node_type::Type{N}=L,\n    morton_type::Type{U}=UInt,\n    built_level::Integer=1,\n) where {L, N, U <: MortonUnsigned}\n\nFields\n\ntree::ImplicitTree{Int}\nnodes::VN <: AbstractVector\nleaves::VL <: AbstractVector\norder::VO <: AbstractVector\nbuilt_level::Int\nstats::BVHStats\n\nExamples\n\nSimple usage with bounding spheres and default 64-bit types:\n\nusing ImplicitBVH\nusing ImplicitBVH: BSphere\nusing StaticArrays\n\n# Generate some simple bounding spheres\nbounding_spheres = [\n    BSphere(SA[0., 0., 0.], 0.5),\n    BSphere(SA[0., 0., 1.], 0.6),\n    BSphere(SA[0., 0., 2.], 0.5),\n    BSphere(SA[0., 0., 3.], 0.4),\n    BSphere(SA[0., 0., 4.], 0.6),\n]\n\n# Build BVH\nbvh = BVH(bounding_spheres)\n\n# Traverse BVH for contact detection\ntraversal = traverse(bvh)\n@show traversal.contacts;\n;\n\n# output\ntraversal.contacts = [(4, 5), (1, 2), (2, 3)]\n\nUsing Float32 bounding spheres for leaves, Float32 bounding boxes for nodes above, and UInt32 Morton codes:\n\nusing ImplicitBVH\nusing ImplicitBVH: BBox, BSphere\nusing StaticArrays\n\n# Generate some simple bounding spheres\nbounding_spheres = [\n    BSphere{Float32}(SA[0., 0., 0.], 0.5),\n    BSphere{Float32}(SA[0., 0., 1.], 0.6),\n    BSphere{Float32}(SA[0., 0., 2.], 0.5),\n    BSphere{Float32}(SA[0., 0., 3.], 0.4),\n    BSphere{Float32}(SA[0., 0., 4.], 0.6),\n]\n\n# Build BVH\nbvh = BVH(bounding_spheres, BBox{Float32}, UInt32)\n\n# Traverse BVH for contact detection\ntraversal = traverse(bvh)\n@show traversal.contacts;\n;\n\n# output\ntraversal.contacts = [(4, 5), (1, 2), (2, 3)]\n\nBuild BVH up to level 2 and start traversing down from level 3, reusing the previous traversal cache:\n\nbvh = BVH(bounding_spheres, BBox{Float32}, UInt32, 2)\ntraversal = traverse(bvh, 3, traversal)\n\n\n\n\n\n","category":"type"},{"location":"#ImplicitBVH.traverse","page":"ImplicitBVH.jl Documentation","title":"ImplicitBVH.traverse","text":"traverse(\n    bvh::BVH,\n    start_level=max(bvh.tree.levels ÷ 2, bvh.built_level),\n    cache::Union{Nothing, BVHTraversal}=nothing,\n)::BVHTraversal\n\nTraverse bvh downwards from start_level, returning all contacting bounding volume leaves. The returned BVHTraversal also contains two contact buffers that can be reused on future traversals.\n\nExamples\n\nusing ImplicitBVH\nusing ImplicitBVH: BBox, BSphere\nusing StaticArrays\n\n# Generate some simple bounding spheres\nbounding_spheres = [\n    BSphere{Float32}(SA[0., 0., 0.], 0.5),\n    BSphere{Float32}(SA[0., 0., 1.], 0.6),\n    BSphere{Float32}(SA[0., 0., 2.], 0.5),\n    BSphere{Float32}(SA[0., 0., 3.], 0.4),\n    BSphere{Float32}(SA[0., 0., 4.], 0.6),\n]\n\n# Build BVH\nbvh = BVH(bounding_spheres, BBox{Float32}, UInt32)\n\n# Traverse BVH for contact detection\ntraversal = traverse(bvh, 2)\n\n# Reuse traversal buffers for future contact detection - possibly with different BVHs\ntraversal = traverse(bvh, 2, traversal)\n@show traversal.contacts;\n;\n\n# output\ntraversal.contacts = [(4, 5), (1, 2), (2, 3)]\n\n\n\n\n\n","category":"function"},{"location":"#Other-BVH-Interfaces","page":"ImplicitBVH.jl Documentation","title":"Other BVH Interfaces","text":"","category":"section"},{"location":"","page":"ImplicitBVH.jl Documentation","title":"ImplicitBVH.jl Documentation","text":"BVHTraversal\nImplicitBVH.BVHStats\nImplicitBVH.IndexPair","category":"page"},{"location":"#ImplicitBVH.BVHTraversal","page":"ImplicitBVH.jl Documentation","title":"ImplicitBVH.BVHTraversal","text":"struct BVHTraversal{VC<:(AbstractVector)}\n\nCollected BVH traversal contacts list, plus the two buffers cache1 and cache2 which can be reused for future traversals to minimise memory allocations.\n\n\n\n\n\n","category":"type"},{"location":"#ImplicitBVH.BVHStats","page":"ImplicitBVH.jl Documentation","title":"ImplicitBVH.BVHStats","text":"mutable struct BVHStats\n\nCollected statistics about a BVH construction and contact traversal; populated after calling traverse.\n\nFields\n\nstart_level::Union{Nothing, Int64}: Default: nothing\nnum_checks::Union{Nothing, Int64}: Default: nothing\nnum_contacts::Union{Nothing, Int64}: Default: nothing\n\n\n\n\n\n","category":"type"},{"location":"#ImplicitBVH.IndexPair","page":"ImplicitBVH.jl Documentation","title":"ImplicitBVH.IndexPair","text":"struct Tuple{Int64, Int64}\n\nAlias for a tuple of two indices representing e.g. a contacting pair.\n\n\n\n\n\n","category":"type"},{"location":"#Index","page":"ImplicitBVH.jl Documentation","title":"Index","text":"","category":"section"},{"location":"","page":"ImplicitBVH.jl Documentation","title":"ImplicitBVH.jl Documentation","text":"","category":"page"}]
}
