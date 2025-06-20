module Types
  class SymbolWrapperType < ActiveRecord::Type::Value
    def serialize(value)
      value.to_s if value.present?
    end

    def deserialize(value)
      value&.to_sym
    end
  end

  ActiveRecord::Type.register(:symbol_wrapper, self::SymbolWrapperType)
end
