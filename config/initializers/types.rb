require Rails.root.join('app/types/symbol_wrapper_type')

ActiveRecord::Type.register(:symbol_wrapper, SymbolWrapperType)
