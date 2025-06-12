class PDFUploader < CarrierWave::Uploader::Base
  def extension_allowlist
    %w[pdf]
  end

  private

  def default_extension
    "pdf"
  end
end
